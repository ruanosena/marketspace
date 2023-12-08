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
	Text,
	VStack,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeSlash, PencilLine } from "phosphor-react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import LogoSvg from "@asset/Logo.svg";
import { Entrada } from "@comp/Entrada";
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
	const [mostrarSenha, defMostrarSenha] = useState(false);
	const navegacao = useNavigation();

	const {
		control: controle,
		handleSubmit: lidarEnviar,
		formState: { errors: erros },
	} = useForm<FormDadosProps>({ resolver: yupResolver(cadastroEsquema) });

	function lidarVoltar() {
		navegacao.goBack();
	}

	function lidarCadastrar({ nome, email, telefone: telefoneBruto, senha }: FormDadosProps) {
		let foneMatches = telefoneBruto.match(telefoneRegExp);
		let telefone = foneMatches?.slice(1).join("");

		console.log(nome, email, telefone, senha);
	}

	return (
		<Box bgColor="gray.100" flex={1} safeArea>
			<ScrollView flex={1} px={12} bgColor="gray.100">
				<VStack space={2} alignItems="center">
					<LogoSvg width={60} height={40} />
					<Heading fontSize="lg" color="gray.900" mt={1}>
						Boas vindas!
					</Heading>
					<Text color="gray.700" fontSize="md" textAlign="center">
						Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
					</Text>
				</VStack>
				<VStack my={8} space={4}>
					<Box
						borderWidth={2}
						alignItems="flex-end"
						justifyContent="flex-end"
						borderColor="blue.300"
						rounded="full"
						w={88}
						h={88}
						mx="auto"
					>
						<Image
							w="full"
							h="full"
							resizeMode="contain"
							source={perfilExemplo}
							alt="Imagem da foto de perfil"
							position="absolute"
						/>
						<IconButton
							mr={-4}
							mb={-1}
							size="sm"
							icon={<Icon as={PencilLine} color="gray.100" />}
							bgColor="blue.300"
							rounded="full"
						/>
					</Box>
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
					<Botao mt={2} onPress={lidarEnviar(lidarCadastrar)}>
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
