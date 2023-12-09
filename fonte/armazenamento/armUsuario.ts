import ArmazenamentoAsync from "@react-native-async-storage/async-storage";
import { USUARIO_ARM } from "./armConfig";
import { UsuarioDTO } from "@dto/usuarioDTO";

export async function armSalvarUsuario(usuario: UsuarioDTO) {
	await ArmazenamentoAsync.setItem(USUARIO_ARM, JSON.stringify(usuario));
}

export async function armObterUsuario() {
	let armazenamento = await ArmazenamentoAsync.getItem(USUARIO_ARM);

	const usuario: UsuarioDTO = armazenamento ? JSON.parse(armazenamento) : {};

	return usuario;
}

export async function armRemoverUsuario() {
  await ArmazenamentoAsync.removeItem(USUARIO_ARM);
}
