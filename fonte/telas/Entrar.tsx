import { useNavigation } from "@react-navigation/native";
import { AutNavegadorRotasProps } from "@rota/aut.rotas";
import { Box, Button, ScrollView, Text } from "native-base";

import LogoSvg from "@asset/Logo.svg";

export function Entrar() {
	const navegacao = useNavigation<AutNavegadorRotasProps>();

	function lidarNovaConta() {
		navegacao.navigate("cadastrar");
	}

	return (
		<Box bgColor="gray.100" flex={1} safeArea>
			<ScrollView flex={1}>
				<LogoSvg />
				<Text>Entrar</Text>
				<Button onPress={lidarNovaConta}>Criar uma conta</Button>
			</ScrollView>
		</Box>
	);
}
