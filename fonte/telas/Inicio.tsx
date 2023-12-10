import { useCallback, useState } from "react";
import { Box, FlatList, useToast } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AnuncioCartao } from "@comp/AnuncioCartao";
import { CTAAnuncios } from "@comp/CTAAnuncios";
import { CatalogoCabecalho } from "@comp/CatalogoCabecalho";
import { InicioCabecalho } from "@comp/InicioCabecalho";
import { CatalogoNavegadorRotasProps } from "@rota/catalogo.rotas";
import { Carregando } from "@comp/Carregando";
import { AppErro } from "@util/AppErro";
import { Api } from "@servico/api";
import { ProdutoDTO } from "@dto/produtoDTO";

export function Inicio() {
	const [estaBuscando, defEstaBuscando] = useState(true);
	const [produtos, defProdutos] = useState<ProdutoDTO[]>([]);
	const navegacao = useNavigation<CatalogoNavegadorRotasProps>();
	const torrada = useToast();

	function lidarAbrirAnuncio() {
		navegacao.navigate("anuncio");
	}

	async function buscarProdutos() {
		try {
			const resposta = await Api.get("/products");

			defProdutos(resposta.data);

		} catch (erro) {
			let mensagem =
				erro instanceof AppErro ? erro.message : "Não foi possível carregar o catálogo";

			torrada.show({ title: mensagem, placement: "bottom", bgColor: "red.300" });
		} finally {
			defEstaBuscando(false);
		}
	}

	useFocusEffect(
		useCallback(() => {
			buscarProdutos();
		}, [])
	);

	return estaBuscando ? (
		<Carregando />
	) : (
		<Box flex={1}>
			<InicioCabecalho />
			<CTAAnuncios />
			<CatalogoCabecalho />
			<FlatList
				my={6}
				px={6}
				data={produtos}
				keyExtractor={(item, indice) => "anuncio-" + item + indice}
				renderItem={({ item }) => (
					<AnuncioCartao
						onPress={() => lidarAbrirAnuncio()}
						dados={item}
						style={{ flex: 1, marginBottom: 24 }}
					/>
				)}
				horizontal={false}
				numColumns={2}
				columnWrapperStyle={{
					columnGap: 24,
				}}
				flex={1}
				_contentContainerStyle={{
					pb: 16,
				}}
			/>
		</Box>
	);
}
