import { ProdutoDTO } from "@dto/produtoDTO";
import useAut from "@hook/useAut";
import { Api } from "@servico/api";
import { FormDadosProps as CriarFormDadosProps } from "@tela/Criar";
import { ImagePickerAsset } from "expo-image-picker";
import { ReactNode, createContext, useState } from "react";

type ProdutosContextoDadosProps = {
	produtos: ProdutoDTO[];
	meusProdutos: ProdutoDTO[];
	buscarProdutos: () => Promise<void>;
	buscarProduto: (id: string) => Promise<ProdutoDTO>;
	buscarMeusProdutos: () => Promise<void>;
	criarProduto: (dados: CriarFormDadosProps) => Promise<ProdutoDTO>;
	enviarFotos: (produtoId: string, fotos: ImagePickerAsset[]) => Promise<void>;
	defFiltros: React.Dispatch<React.SetStateAction<ProdutosFiltrosProps>>;
};

export const ProdutosContexto = createContext<ProdutosContextoDadosProps>(
	{} as ProdutosContextoDadosProps
);

type ProdutosContextoProviderProps = {
	children: ReactNode;
};

export type MetodosPagamentoProps = ("pix" | "card" | "boleto" | "cash" | "deposit")[];

export type ProdutosFiltrosProps = {
	is_new?: boolean;
	accept_trade?: boolean;
	payment_methods?: MetodosPagamentoProps;
	query?: string;
};

export default function ProdutosContextoProvider({ children }: ProdutosContextoProviderProps) {
	const [produtos, defProdutos] = useState<ProdutoDTO[]>([]);
	const [meusProdutos, defMeusProdutos] = useState<ProdutoDTO[]>([]);
	const [filtros, defFiltros] = useState<ProdutosFiltrosProps>({});
	const { usuario } = useAut();

	async function criarProduto({
		titulo,
		descricao,
		ehNovo,
		preco,
		aceitaTroca,
		metodosPagamento,
	}: CriarFormDadosProps) {
		try {
			const { data: produto } = await Api.post("/products", {
				name: titulo,
				description: descricao,
				price: Number(preco),
				is_new: ehNovo == "true" ? true : false,
				accept_trade: aceitaTroca,
				payment_methods: metodosPagamento,
				user: usuario,
			});

			return produto;
		} catch (erro) {
			throw erro;
		}
	}

	async function enviarFotos(produtoId: string, fotos: ImagePickerAsset[]) {
		try {
			const formDados = new FormData();
			formDados.append("product_id", produtoId);

			fotos.forEach((foto) => {
				let extensao = foto.uri.split(".").pop();
				formDados.append(`images`, {
					name: `Produto-${foto.fileName}.${extensao}`.toLowerCase(),
					uri: foto.uri,
					type: `${foto.type}/${extensao}`,
				} as any);
			});

			await Api.post("/products/images", formDados, {
				headers: { "Content-Type": "multipart/form-data" },
			});
		} catch (erro) {
			throw erro;
		}
	}

	async function buscarProdutos() {
		try {
			const resposta = await Api.get("/products", {
				params: { ...filtros },
			});
			defProdutos(resposta.data);
		} catch (erro) {
			throw erro;
		}
	}

	async function buscarProduto(id: string) {
		const resposta = await Api.get(`/products/${id}`);

		return resposta.data;
	}

	async function buscarMeusProdutos() {
		try {
			const resposta = await Api.get("/users/products");

			defMeusProdutos(resposta.data);
		} catch (erro) {
			throw erro;
		}
	}

	return (
		<ProdutosContexto.Provider
			value={{
				produtos,
				meusProdutos,
				buscarProdutos,
				buscarProduto,
				buscarMeusProdutos,
				defFiltros,
				criarProduto,
				enviarFotos,
			}}
		>
			{children}
		</ProdutosContexto.Provider>
	);
}
