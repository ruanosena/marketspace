import { useNavigation } from "@react-navigation/native";
import { Box, Button, Heading, Image, ScrollView, Text, VStack } from "native-base";

import LogoSvg from "@asset/Logo.svg";
import { Entrada } from "@comp/Entrada";
import { Botao } from "@comp/Botao";

export function Cadastrar() {
	const navegacao = useNavigation();

	function lidarVoltar() {
		navegacao.goBack();
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
					<Image source={{ uri: "@asset/perfilPlaceholder.png" }} alt="Imagem da foto de perfil" />
					<Entrada placeholder="Nome" />
					<Entrada placeholder="E-mail" />
					<Entrada placeholder="Telefone" />
					<Entrada placeholder="Senha" secureTextEntry />
					<Entrada placeholder="Confirmar senha" secureTextEntry />
					<Botao mt={2}>Criar</Botao>
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
