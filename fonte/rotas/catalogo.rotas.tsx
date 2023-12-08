import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Anuncio } from "@tela/Anuncio";
import { Criar } from "@tela/Criar";
import { Inicio } from "@tela/Inicio";
import { Visualizar } from "@tela/Visualizar";

type CatalogoRotas = {
	inicio: undefined;
	anuncio: undefined;
	criar: undefined;
	visualizar: undefined;
};

export type CatalogoNavegadorRotasProps = NativeStackNavigationProp<CatalogoRotas>;

const { Navigator: Navegador, Screen: Tela } = createNativeStackNavigator<CatalogoRotas>();

export function CatalogoRotas() {
	return (
		<Navegador screenOptions={{ headerShown: false }}>
			<Tela name="inicio" component={Inicio} />
			<Tela name="anuncio" component={Anuncio} />
			<Tela name="criar" component={Criar} />
			<Tela name="visualizar" component={Visualizar} />
		</Navegador>
	);
}
