import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Icon, useTheme } from "native-base";
import { House, Tag } from "phosphor-react-native";
import { CatalogoRotas } from "./catalogo.rotas";
import { MeusAnuncios } from "@tela/MeusAnuncios";
import { AnunciosRotas } from "./anuncios.rotas";

type AppRotas = {
	catalogo: undefined;
	anuncios: undefined;
};

export type AppNavegadorRotasProps = BottomTabNavigationProp<AppRotas>;

const { Screen: Tela, Navigator: Navegador } = createBottomTabNavigator<AppRotas>();

export function AppRotas() {
	const { colors: cores } = useTheme();

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
				name="catalogo"
				component={CatalogoRotas}
				options={{ tabBarIcon: ({ color, size }) => <Icon as={House} color={color} size={size} /> }}
			/>

			<Tela
				name="anuncios"
				component={AnunciosRotas}
				options={{ tabBarIcon: ({ color, size }) => <Icon as={Tag} color={color} size={size} /> }}
			/>
		</Navegador>
	);
}
