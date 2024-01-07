import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { MeusAnuncios } from "@tela/MeusAnuncios";
import { Detalhes } from "@tela/Detalhes";
import { Editar } from "@tela/Editar";

type AnunciosRotas = {
	meus_anuncios: undefined;
	detalhes: { anuncioId: string };
	editar: { anuncioId: string };
};

export type AnunciosNavegadorRotasProps = NativeStackNavigationProp<AnunciosRotas>;

const { Navigator: Navegador, Screen: Tela } = createNativeStackNavigator<AnunciosRotas>();

export function AnunciosRotas() {
	return (
		<Navegador screenOptions={{ headerShown: false }}>
			<Tela name="meus_anuncios" component={MeusAnuncios} />
			<Tela name="detalhes" component={Detalhes} />
			<Tela name="editar" component={Editar} />
		</Navegador>
	);
}
