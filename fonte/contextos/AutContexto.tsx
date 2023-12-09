import { ReactNode, createContext, useState } from "react";
import { UsuarioDTO } from "@dto/usuarioDTO";
import { Api } from "@servico/api";

export type AutContextoDadosProps = {
	usuario: UsuarioDTO;
	entrar: (email: string, senha: string) => void;
};

type AutContextoProviderProps = {
	children: ReactNode;
};

export const AutContexto = createContext<AutContextoDadosProps>({} as AutContextoDadosProps);

export function AutContextoProvider({ children }: AutContextoProviderProps) {
	const [usuario, defUsuario] = useState<UsuarioDTO>({} as UsuarioDTO);

	async function entrar(email: string, senha: string) {
		try {
			const { data } = await Api.post("/sessions", { email, password: senha });
			if (data.user) {
				defUsuario(data.user);
			}
		} catch (erro) {
			throw erro;
		}
	}

	return <AutContexto.Provider value={{ usuario, entrar }}>{children}</AutContexto.Provider>;
}
