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
import useProdutos from "@hook/useProdutos";

export function Inicio() {
	const [estaBuscando, defEstaBuscando] = useState(true);
	const navegacao = useNavigation<CatalogoNavegadorRotasProps>();
	const torrada = useToast();
	const { buscarProdutos, produtos } = useProdutos();

	function lidarAbrirAnuncio() {
		navegacao.navigate("anuncio");
	}

	useFocusEffect(
		useCallback(() => {
			try {
				buscarProdutos();
			} catch (erro) {
				console.log(erro);
				let mensagem =
					erro instanceof AppErro ? erro.message : "Não foi possível carregar o catálogo";

				torrada.show({ title: mensagem, placement: "bottom", bgColor: "red.300" });
			} finally {
				defEstaBuscando(false);
			}
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
