import { armObterToken, armSalvarToken } from "@arm/armTokenJWT";
import { AppErro } from "@util/AppErro";
import axios, { AxiosError, AxiosInstance } from "axios";

type Sair = () => void;

type TipoPromise = {
	aoSucesso: (token: string) => void;
	aoFalhar: (erro: AxiosError) => void;
};

type ApiInstanciaProps = AxiosInstance & {
	registrarInterceptadorToken: (sair: Sair) => () => void;
};

export const Api = axios.create({
	baseURL: "http://192.168.122.1:3333",
}) as ApiInstanciaProps;

let filaComFalha: TipoPromise[] = [];
let estaAtualizando = false;

Api.registrarInterceptadorToken = (sair) => {
	const interceptadorToken = Api.interceptors.response.use(
		(res) => res,
		async (requisicaoErro) => {
			if (requisicaoErro?.response?.status == 401) {
				if (
					requisicaoErro.response.data?.message == "token.expired" ||
					requisicaoErro.response.data?.message == "token.invalid"
				) {
					const { token_atualizacao } = await armObterToken();

					if (!token_atualizacao) {
						sair();
						return Promise.reject(requisicaoErro);
					}

					const configReqOriginal = requisicaoErro.config;

					if (estaAtualizando) {
						return new Promise((res, rej) => {
							filaComFalha.push({
								aoSucesso(token) {
									configReqOriginal.headers = {
										Authorization: `Bearer ${token}`,
									};
									res(Api(configReqOriginal));
								},
								aoFalhar(erro) {
									rej(erro);
								},
							});
						});
					}
					estaAtualizando = true;

					return new Promise(async (res, rej) => {
						try {
							const { data } = await Api.post("/sessions/refresh-token", {
								refresh_token: token_atualizacao,
							});
							await armSalvarToken({ token: data.token, token_atualizacao: data.refresh_token });

							if (configReqOriginal.data) {
								configReqOriginal.data = JSON.parse(configReqOriginal.data);
							}
							configReqOriginal.headers = { Authorization: `Bearer ${data.token}` };
							Api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

							filaComFalha.forEach((requisicao) => {
								requisicao.aoSucesso(data.token);
							});

							console.log("Token JWT Atualizado");

							res(Api(configReqOriginal));
						} catch (erro: any) {
							filaComFalha.forEach((requisicao) => {
								requisicao.aoFalhar(erro);
							});

							sair();
							rej(erro);
						} finally {
							estaAtualizando = false;
							filaComFalha = [];
						}
					});
				}

				sair();
			}
			if (requisicaoErro.response && requisicaoErro.response.data) {
				return Promise.reject(new AppErro(requisicaoErro.response.data.message));
			} else {
				return Promise.reject(requisicaoErro);
			}
		}
	);

	return () => {
		Api.interceptors.response.eject(interceptadorToken);
	};
};
