import { useNavigation } from "@react-navigation/native";
import { AutNavegadorRotasProps } from "@rota/aut.rotas";
import { Box, Button, Center, Heading, ScrollView, Text, VStack } from "native-base";

import LogotipoSvg from "@asset/Logotipo.svg";
import { Entrada } from "@comp/Entrada";
import { Botao } from "@comp/Botao";

export function Entrar() {
	const navegacao = useNavigation<AutNavegadorRotasProps>();

	function lidarNovaConta() {
		navegacao.navigate("cadastrar");
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
						<Entrada placeholder="E-mail" />
						<Entrada placeholder="Senha" secureTextEntry />
						<Botao w="full" bgColor="blue.300" mt={4}>
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
