import { useState } from "react";
import { Box, FlatList } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { AnuncioCartao } from "@comp/AnuncioCartao";
import { CTAAnuncios } from "@comp/CTAAnuncios";
import { CatalogoCabecalho } from "@comp/CatalogoCabecalho";
import { InicioCabecalho } from "@comp/InicioCabecalho";
import { CatalogoNavegadorRotasProps } from "@rota/catalogo.rotas";

export function Inicio() {
	const [anuncios, defAnuncios] = useState([1, 2, 1, 1, 2, 2, 2, 1]);
	const navegacao = useNavigation<CatalogoNavegadorRotasProps>();

	function lidarAbrirAnuncio() {
		navegacao.navigate("anuncio");
	}
	return (
		<Box flex={1}>
			<InicioCabecalho />
			<CTAAnuncios />
			<CatalogoCabecalho />
			<FlatList
				my={6}
				px={6}
				data={anuncios}
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
