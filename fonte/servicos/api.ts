import { AppErro } from "@util/AppErro";
import axios from "axios";

export const Api = axios.create({
	baseURL: "http://192.168.122.1:3333",
});

Api.interceptors.response.use(
	(resposta) => resposta,
	(erro) => {
		if (erro.response && erro.response.data) {
			// backend erro
			return Promise.reject(new AppErro(erro.response.data.message));
		} else {
			return Promise.reject(erro);
		}
	}
);
