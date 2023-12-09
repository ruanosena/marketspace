import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import { useFonts, Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla";
import { Tema } from "./fonte/tema";
import { Rotas } from "@rota/index";
import { Carregando } from "@comp/Carregando";
import { AutContextoProvider } from "@ctx/AutContexto";

export default function App() {
	const [fonteCarregada] = useFonts({ Karla_400Regular, Karla_700Bold });

	return (
		<NativeBaseProvider theme={Tema}>
			<StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
			<AutContextoProvider>{fonteCarregada ? <Rotas /> : <Carregando />}</AutContextoProvider>
		</NativeBaseProvider>
	);
}
