import { AnuncioCartao } from "@comp/AnuncioCartao";
import { CTAAnuncios } from "@comp/CTAAnuncios";
import { CatalogoCabecalho } from "@comp/CatalogoCabecalho";
import { InicioCabecalho } from "@comp/InicioCabecalho";
import { AppRotas } from "@rota/app.rotas";
import { Box, FlatList, Text } from "native-base";
import { useState } from "react";

export function Inicio() {
	const [anuncios, defAnuncios] = useState([1, 2, 1, 1, 2, 2, 2, 1]);

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
				renderItem={({ item }) => <AnuncioCartao dados={item} />}
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
