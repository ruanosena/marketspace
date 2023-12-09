import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	Box,
	Button,
	Heading,
	Icon,
	IconButton,
	Image,
	Pressable,
	ScrollView,
	Skeleton,
	Text,
	VStack,
	useToast,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeSlash, PencilLine } from "phosphor-react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagemSelecionador from "expo-image-picker";
import * as SistemaArquivo from "expo-file-system";
import { Api } from "@servico/api";
import useAut from "@hook/useAut";
import { AppErro } from "@util/AppErro";
import { Entrada } from "@comp/Entrada";
import LogoSvg from "@asset/Logo.svg";
import { Botao } from "@comp/Botao";
import perfilExemplo from "@asset/perfilPlaceholder.png";

type FormDadosProps = {
	nome: string;
	email: string;
	telefone: string;
	senha: string;
	confirmarSenha: string;
};

const telefoneRegExp = /^\(?(\d{2})\)?\s?(\d{4,5})-?(\d{4})$/;

const cadastroEsquema = yup.object({
	nome: yup.string().required("Informe o nome"),
	email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
	telefone: yup
		.string()
		.required("Informe um telefone")
		.matches(telefoneRegExp, "Telefone inválido"),
	senha: yup
		.string()
		.required("Informe a senha")
		.min(6, "A senha deve conter no mínimo 6 caracteres"),
	confirmarSenha: yup
		.string()
		.required("Confirme a senha")
		.oneOf([yup.ref("senha"), ""], "A confirmação da senha não confere"),
});

export function Cadastrar() {
	const [estaEnviando, defEstaEnviando] = useState(false);
	const [fotoEstaCarregando, defFotoEstaCarregando] = useState(false);
	const [foto, defFoto] = useState<ImagemSelecionador.ImagePickerAsset>();
	const [mostrarSenha, defMostrarSenha] = useState(false);
	const navegacao = useNavigation();
	const torrada = useToast();
	const { entrar } = useAut();

	const {
		control: controle,
		handleSubmit: lidarEnviar,
		formState: { errors: erros },
	} = useForm<FormDadosProps>({ resolver: yupResolver(cadastroEsquema) });

	function lidarVoltar() {
		navegacao.goBack();
	}

	async function lidarCadastrar({ nome, email, telefone: telefoneBruto, senha }: FormDadosProps) {
		try {
			defEstaEnviando(true);
			if (!foto) {
				throw new AppErro("Selecione uma foto de perfil.");
			}
			let foneMatches = telefoneBruto.match(telefoneRegExp);
			let telefone = foneMatches?.slice(1).join("");

			const dadosForm = new FormData();

			const extensao = foto.uri.split(".").pop();
			const fotoArquivo = {
				name: `Avatar-${Date.now()}.${extensao}`.toLowerCase(),
				uri: foto.uri,
				type: `${foto.type}/${extensao}`,
			} as any;

			dadosForm.append("avatar", fotoArquivo);
			dadosForm.append("name", nome);
			dadosForm.append("email", email);
			dadosForm.append("tel", telefone + "");
			dadosForm.append("password", senha);

			await Api.post("/users", dadosForm, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			torrada.show({
				title: "Usuário criado com sucesso.",
				placement: "bottom",
				bgColor: "blue.300",
			});

			entrar(email, senha);
		} catch (erro) {
			let mensagem =
				erro instanceof AppErro
					? erro.message
					: "Não foi possível criar a conta, tente novamente mais tarde.";

			torrada.show({ title: mensagem, placement: "bottom", bgColor: "red.300" });
		} finally {
			defEstaEnviando(false);
		}
	}

	async function lidarSelecionarFoto() {
		defFotoEstaCarregando(true);
		try {
			const fotoSelecionada = await ImagemSelecionador.launchImageLibraryAsync({
				mediaTypes: ImagemSelecionador.MediaTypeOptions.Images,
				quality: 1,
				aspect: [1, 1],
				allowsEditing: true,
				selectionLimit: 1,
			});

			if (fotoSelecionada.canceled) return;

			if (fotoSelecionada.assets[0]) {
				const fotoInfo = await SistemaArquivo.getInfoAsync(fotoSelecionada.assets[0].uri);

				if (fotoInfo.exists && fotoInfo.size / 1024 / 1024 > 5) {
					return torrada.show({
						title: "Imagem é muito grande, escolha uma de até 5MB",
						placement: "bottom",
						bgColor: "red.300",
					});
				}
			}

			defFoto(fotoSelecionada.assets[0]);
		} catch (erro) {
			console.log(erro);
		} finally {
			defFotoEstaCarregando(false);
		}
	}

	return (
		<Box bgColor="gray.100" flex={1} safeArea>
			<ScrollView flex={1} px={12} bgColor="gray.100">
				<VStack space={2} alignItems="center">
					<LogoSvg width={60} height={40} />
					<Heading fontSize="lg" color="gray.900" mt={1}>
						Boas vindas!
					</Heading>
					<Text color="gray.700" fontSize="xs" textAlign="center">
						Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
					</Text>
				</VStack>
				<VStack my={8} space={4}>
					{fotoEstaCarregando ? (
						<Skeleton
							w={88}
							h={88}
							rounded="full"
							startColor="gray.300"
							endColor="gray.500"
							mx="auto"
						/>
					) : (
						<Box alignItems="flex-end" justifyContent="flex-end" w={88} h={88} mx="auto">
							<Image
								w="full"
								h="full"
								overflow="hidden"
								rounded="full"
								borderWidth={3}
								borderColor="blue.300"
								resizeMode="contain"
								source={foto ? { uri: foto.uri } : perfilExemplo}
								alt="Imagem da foto de perfil"
								position="absolute"
							/>
							<IconButton
								onPress={lidarSelecionarFoto}
								mr={-4}
								mb={-1}
								size="sm"
								icon={<Icon as={PencilLine} color="gray.100" />}
								bgColor="blue.300"
								rounded="full"
							/>
						</Box>
					)}
					<Controller
						name="nome"
						control={controle}
						render={({ field: { onChange, value } }) => (
							<Entrada
								placeholder="Nome"
								onChangeText={onChange}
								value={value}
								erro={erros.nome?.message}
							/>
						)}
					/>
					<Controller
						name="email"
						control={controle}
						render={({ field: { onChange, value } }) => (
							<Entrada
								placeholder="E-mail"
								keyboardType="email-address"
								autoCapitalize="none"
								onChangeText={onChange}
								value={value}
								erro={erros.email?.message}
							/>
						)}
					/>
					<Controller
						name="telefone"
						control={controle}
						render={({ field: { onChange, value } }) => (
							<Entrada
								placeholder="Telefone"
								keyboardType="phone-pad"
								onChangeText={onChange}
								value={value}
								erro={erros.telefone?.message}
							/>
						)}
					/>

					<Controller
						name="senha"
						control={controle}
						render={({ field: { onChange, value } }) => (
							<Entrada
								placeholder="Senha"
								autoCapitalize="none"
								onChangeText={onChange}
								value={value}
								erro={erros.senha?.message}
								secureTextEntry={!mostrarSenha}
								type={mostrarSenha ? "text" : "password"}
								InputRightElement={
									<Pressable onPress={() => defMostrarSenha(!mostrarSenha)}>
										<Icon as={mostrarSenha ? Eye : EyeSlash} mr={2} />
									</Pressable>
								}
							/>
						)}
					/>
					<Controller
						name="confirmarSenha"
						control={controle}
						render={({ field: { onChange, value } }) => (
							<Entrada
								placeholder="Confirmar senha"
								autoCapitalize="none"
								returnKeyType="send"
								onSubmitEditing={lidarEnviar(lidarCadastrar)}
								onChangeText={onChange}
								value={value}
								erro={erros.confirmarSenha?.message}
								secureTextEntry={!mostrarSenha}
								type={mostrarSenha ? "text" : "password"}
								InputRightElement={
									<Pressable onPress={() => defMostrarSenha(!mostrarSenha)}>
										<Icon as={mostrarSenha ? Eye : EyeSlash} mr={2} />
									</Pressable>
								}
							/>
						)}
					/>
					<Botao mt={2} isLoading={estaEnviando} onPress={lidarEnviar(lidarCadastrar)}>
						Criar
					</Botao>
				</VStack>
				<VStack mt={4} mb={12} space={4} alignItems="center">
					<Text color="gray.700">Já tem uma conta?</Text>
					<Botao
						width="full"
						bgColor="gray.300"
						_text={{ color: "gray.700" }}
						onPress={lidarVoltar}
					>
						Ir para o login
					</Botao>
				</VStack>
			</ScrollView>
		</Box>
	);
}
