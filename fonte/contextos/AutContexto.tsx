import { ReactNode, createContext, useEffect, useState } from "react";
import { UsuarioDTO } from "@dto/usuarioDTO";
import { Api } from "@servico/api";
import { armObterUsuario, armRemoverUsuario, armSalvarUsuario } from "@arm/armUsuario";

export type AutContextoDadosProps = {
	usuario: UsuarioDTO;
	entrar: (email: string, senha: string) => void;
	estaCarregando: boolean;
	sair: () => Promise<void>;
};

type AutContextoProviderProps = {
	children: ReactNode;
};

export const AutContexto = createContext<AutContextoDadosProps>({} as AutContextoDadosProps);

export function AutContextoProvider({ children }: AutContextoProviderProps) {
	const [estaCarregando, defEstaCarregando] = useState(true);
	const [usuario, defUsuario] = useState<UsuarioDTO>({} as UsuarioDTO);

	async function entrar(email: string, senha: string) {
		try {
			const { data } = await Api.post("/sessions", { email, password: senha });
			if (data.user) {
				defUsuario(data.user);
				await armSalvarUsuario(data.user);
			}
		} catch (erro) {
			throw erro;
		}
	}

	async function sair() {
		try {
			defEstaCarregando(true);
			defUsuario({} as UsuarioDTO);

			await armRemoverUsuario();
		} catch (erro) {
			throw erro;
		} finally {
			defEstaCarregando(false);
		}
	}

	async function carregar() {
		try {
			const usuarioSalvo = await armObterUsuario();

			if (usuarioSalvo.id) {
				defUsuario(usuarioSalvo);
			}
		} catch (erro) {
			throw erro;
		} finally {
			defEstaCarregando(false);
		}
	}

	useEffect(() => {
		carregar();
	}, []);

	return (
		<AutContexto.Provider value={{ usuario, entrar, estaCarregando, sair }}>
			{children}
		</AutContexto.Provider>
	);
}
