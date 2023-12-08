import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import { AutRotas } from "./aut.rotas";
import { AppRotas } from "./app.rotas";

export function Rotas() {
	const { colors: cores } = useTheme();

	const navTema = DefaultTheme;
	navTema.colors.background = cores.gray[100];

	return (
		<Box flex={1} safeArea bgColor="gray.100">
			<NavigationContainer theme={navTema}>
				<AutRotas />
			</NavigationContainer>
		</Box>
	);
}
