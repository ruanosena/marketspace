import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import { AutRotas } from "./aut.rotas";
import { AppRotas } from "./app.rotas";
import useAut from "@hook/useAut";

export function Rotas() {
	const { usuario } = useAut();
	const { colors: cores } = useTheme();

	const navTema = DefaultTheme;
	navTema.colors.background = cores.gray[100];

	return (
		<Box flex={1} safeArea bgColor="gray.100">
			<NavigationContainer theme={navTema}>
				{usuario.id ? <AppRotas /> : <AutRotas />}
			</NavigationContainer>
		</Box>
	);
}
