import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AutNavegadorRotasProps } from "@rota/aut.rotas";
import {
	Box,
	Button,
	Center,
	Heading,
	Icon,
	Pressable,
	ScrollView,
	Text,
	VStack,
	useToast,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeSlash } from "phosphor-react-native";
import { Entrada } from "@comp/Entrada";
import { Botao } from "@comp/Botao";

import LogotipoSvg from "@asset/Logotipo.svg";
import { AppErro } from "@util/AppErro";
import useAut from "@hook/useAut";

type FormDadosProps = {
	email: string;
	senha: string;
};

export function Entrar() {
	const [estaEnviando, defEstaEnviando] = useState(false);
	const [mostrarSenha, defMostrarSenha] = useState(false);
	const navegacao = useNavigation<AutNavegadorRotasProps>();
	const {
		control: controle,
		handleSubmit: lidarEnviar,
		formState: { errors: erros },
	} = useForm<FormDadosProps>();
	const { entrar } = useAut();
	const torrada = useToast();

	function lidarNovaConta() {
		navegacao.navigate("cadastrar");
	}

	async function lidarEntrar({ email, senha }: FormDadosProps) {
		try {
			defEstaEnviando(true);

			await entrar(email, senha);
		} catch (erro) {
			let mensagem =
				erro instanceof AppErro
					? erro.message
					: "Não foi possível entrar, tente novamente mais tarde.";

			torrada.show({ title: mensagem, placement: "bottom", bgColor: "red.300" });
		} finally {
			defEstaEnviando(false);
		}
	}

	return (
		<Box flex={1} safeArea>
			<ScrollView flex={1} bgColor="white">
				<VStack px={12} pb={16} bgColor="gray.100" borderBottomRadius="2xl">
					<Center my={16}>
						<LogotipoSvg width={96} height={64} />
						<Heading fontSize="4xl" color="gray.900">
							marketspace
						</Heading>
						<Text fontSize="md" color="gray.600">
							Seu espaço de compra e venda
						</Text>
					</Center>
					<VStack space={4} alignItems="center">
						<Heading fontSize="sm" color="gray.700">
							Acesse sua conta
						</Heading>
						<Controller
							control={controle}
							name="email"
							rules={{ required: "Informe o e-mail" }}
							render={({ field: { onChange, value } }) => (
								<Entrada
									placeholder="E-mail"
									onChangeText={onChange}
									keyboardType="email-address"
									autoCapitalize="none"
									value={value}
									erro={erros.email?.message}
								/>
							)}
						/>
						<Controller
							control={controle}
							name="senha"
							rules={{ required: "Informe a senha" }}
							render={({ field: { onChange, value } }) => (
								<Entrada
									onChangeText={onChange}
									value={value}
									erro={erros.senha?.message}
									onSubmitEditing={lidarEnviar(lidarEntrar)}
									returnKeyType="send"
									placeholder="Senha"
									autoCapitalize="none"
									type={mostrarSenha ? "text" : "password"}
									InputRightElement={
										<Pressable onPress={() => defMostrarSenha(!mostrarSenha)}>
											<Icon as={mostrarSenha ? Eye : EyeSlash} mr={2} />
										</Pressable>
									}
								/>
							)}
						/>
						<Botao
							w="full"
							bgColor="blue.300"
							mt={4}
							isLoading={estaEnviando}
							onPress={lidarEnviar(lidarEntrar)}
						>
							Entrar
						</Botao>
					</VStack>
				</VStack>
				<VStack px={12} my={12} space={4} alignItems="center">
					<Text color="gray.700">Ainda não tem acesso?</Text>
					<Botao
						width="full"
						bgColor="gray.300"
						_text={{ color: "gray.700" }}
						onPress={lidarNovaConta}
					>
						Criar uma conta
					</Botao>
				</VStack>
			</ScrollView>
		</Box>
	);
}
