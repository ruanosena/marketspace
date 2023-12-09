import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Icon, IconButton, useTheme } from "native-base";
import { House, SignOut, Tag } from "phosphor-react-native";
import { CatalogoRotas } from "./catalogo.rotas";
import { MeusAnuncios } from "@tela/MeusAnuncios";
import { AnunciosRotas } from "./anuncios.rotas";
import { Carregando } from "@comp/Carregando";
import useAut from "@hook/useAut";

type AppRotas = {
	catalogo: undefined;
	anuncios: undefined;
	sair: undefined;
};

export type AppNavegadorRotasProps = BottomTabNavigationProp<AppRotas>;

const { Screen: Tela, Navigator: Navegador } = createBottomTabNavigator<AppRotas>();

export function AppRotas() {
	const { sair } = useAut();
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
			<Tela
				name="sair"
				component={Carregando}
				options={{
					tabBarButton: () => (
						<IconButton onPress={sair} icon={<Icon as={SignOut} color="red.300" />} />
					),
				}}
			/>
		</Navegador>
	);
}
