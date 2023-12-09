import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_JWT_ARM } from "./armConfig";

export async function armSalvarToken(token: string) {
	await AsyncStorage.setItem(TOKEN_JWT_ARM, token);
}
export async function armObterToken() {
	let token = await AsyncStorage.getItem(TOKEN_JWT_ARM);

	return token;
}

export async function armRemoverToken() {
	await AsyncStorage.removeItem(TOKEN_JWT_ARM);
}
