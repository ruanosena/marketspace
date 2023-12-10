import { ProdutoDTO } from "@dto/produtoDTO";
import { ReactNode, createContext, useState } from "react";

type ProdutosContextoDadosProps = {
  produtos: ProdutoDTO[];
}

export const ProdutosContexto = createContext({});

type ProdutosContextoProviderProps = {
  children: ReactNode;
}

export default function ProdutosContextoProvider() {
  const [produtos, defProdutos] = useState([]);

	return <ProdutosContexto.Provider value={{}}></ProdutosContexto.Provider>;
}
