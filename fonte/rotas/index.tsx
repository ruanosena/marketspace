import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";
import { AutRotas } from "./aut.rotas";
import { AppRotas } from "./app.rotas";
import useAut from "@hook/useAut";
import { Carregando } from "@comp/Carregando";

export function Rotas() {
	const { usuario, estaCarregando } = useAut();
	const { colors: cores } = useTheme();

	const navTema = DefaultTheme;
	navTema.colors.background = cores.gray[100];

	if (estaCarregando) {
		return <Carregando />;
	}

	return (
		<Box flex={1} safeArea bgColor="gray.100">
			<NavigationContainer theme={navTema}>
				{usuario.id ? <AppRotas /> : <AutRotas />}
			</NavigationContainer>
		</Box>
	);
}
