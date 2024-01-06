import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_JWT_ARM } from "./armConfig";

type ArmazenamentoTokenProps = {
	token: string;
	token_atualizacao: string;
};

export async function armSalvarToken({ token, token_atualizacao }: ArmazenamentoTokenProps) {
	await AsyncStorage.setItem(TOKEN_JWT_ARM, JSON.stringify({ token, token_atualizacao }));
}
export async function armObterToken() {
	let resposta = await AsyncStorage.getItem(TOKEN_JWT_ARM);
	const { token, token_atualizacao }: ArmazenamentoTokenProps = resposta
		? JSON.parse(resposta)
		: {};

	return { token, token_atualizacao };
}

export async function armRemoverToken() {
	await AsyncStorage.removeItem(TOKEN_JWT_ARM);
}
