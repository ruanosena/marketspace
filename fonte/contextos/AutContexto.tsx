import { ReactNode, createContext, useEffect, useState } from "react";
import { UsuarioDTO } from "@dto/usuarioDTO";
import { Api } from "@servico/api";
import { armObterUsuario, armRemoverUsuario, armSalvarUsuario } from "@arm/armUsuario";
import { armObterToken, armRemoverToken, armSalvarToken } from "@arm/armTokenJWT";

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

	async function atualizarUsuarioEToken(usuarioDados: UsuarioDTO, token: string) {
		Api.defaults.headers.common.Authorization = `Bearer ${token}`;
		defUsuario(usuarioDados);
	}

	async function salvarUsuarioEToken(
		usuarioDados: UsuarioDTO,
		token: string,
		token_atualizacao: string
	) {
		try {
			defEstaCarregando(true);
			await armSalvarUsuario(usuarioDados);
			await armSalvarToken({ token, token_atualizacao });
		} catch (erro) {
			throw erro;
		} finally {
			defEstaCarregando(false);
		}
	}

	async function entrar(email: string, senha: string) {
		try {
			const { data } = await Api.post("/sessions", { email, password: senha });
			if (data.user && data.token && data.refresh_token) {
				await salvarUsuarioEToken(data.user, data.token, data.refresh_token);
				atualizarUsuarioEToken(data.user, data.token);
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
			await armRemoverToken();
		} catch (erro) {
			throw erro;
		} finally {
			defEstaCarregando(false);
		}
	}

	async function carregar() {
		try {
			const usuarioSalvo = await armObterUsuario();
			const { token } = await armObterToken();

			if (token && usuarioSalvo.id) {
				atualizarUsuarioEToken(usuario, token);
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

	useEffect(() => {
		const inscricao = Api.registrarInterceptadorToken(sair);

		return () => inscricao();
	}, [sair]);

	return (
		<AutContexto.Provider value={{ usuario, entrar, estaCarregando, sair }}>
			{children}
		</AutContexto.Provider>
	);
}
