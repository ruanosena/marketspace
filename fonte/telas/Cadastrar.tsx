import { useNavigation } from "@react-navigation/native";
import { Box, Button, ScrollView, Text } from "native-base";

import LogoSvg from "@asset/Logo.svg";

export function Cadastrar() {
	const navegacao = useNavigation();

	function lidarVoltar() {
		navegacao.goBack();
	}

	return (
		<Box bgColor="gray.100" flex={1} safeArea>
			<ScrollView flex={1}>
				<LogoSvg />
				<Text>Cadastrar</Text>
				<Button onPress={lidarVoltar}>Ir para o login</Button>
			</ScrollView>
		</Box>
	);
}
