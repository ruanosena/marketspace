import { ProdutosContexto } from "@ctx/ProdutosContexto";
import { useContext } from "react";

export default function useProdutos() {
	const ctx = useContext(ProdutosContexto);
  
	return ctx;
}
