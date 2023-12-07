import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Icon, useTheme } from "native-base";
import { House, Tag } from "phosphor-react-native";
import { Inicio } from "@tela/Inicio";
import { Anuncio } from "@tela/Anuncio";

type AppRotas = {
	inicio: undefined;
	anuncio: undefined;
};

export type AppNavegadorRotasProps = BottomTabNavigationProp<AppRotas>;

const { Screen: Tela, Navigator: Navegador } = createBottomTabNavigator<AppRotas>();

export function AppRotas() {
	const { colors: cores, sizes: tamanhos } = useTheme();

	return (
		<Navegador
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: cores.gray[900],
				tabBarInactiveTintColor: cores.gray[500],
			}}
		>
			<Tela
				name="inicio"
				component={Inicio}
				options={{ tabBarIcon: ({ color }) => <Icon as={House} color={color} /> }}
			/>

			<Tela
				name="anuncio"
				component={Anuncio}
				options={{ tabBarIcon: ({ color }) => <Icon as={Tag} color={color} /> }}
			/>
		</Navegador>
	);
}
