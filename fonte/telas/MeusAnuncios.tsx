import { useState } from "react";
import { Box, FlatList, HStack, Icon, IconButton, Select, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Plus } from "phosphor-react-native";
import { TelaCabecalho } from "@comp/TelaCabecalho";
import { AnuncioCartao } from "@comp/AnuncioCartao";
import { AnunciosNavegadorRotasProps } from "@rota/anuncios.rotas";

type AnunciosFiltros = "Todos" | "Ativos" | "Inativos";

export function MeusAnuncios() {
	const [meusAnuncios, defMeusAnuncios] = useState([1, 2, 2, 1, 2, 1, 1]);
	const [anunciosFiltro, defAnunciosFiltro] = useState("Todos");
	const navegacao = useNavigation<AnunciosNavegadorRotasProps>();

	function lidarAbrirAnuncio() {
		navegacao.navigate("detalhes");
	}

	return (
		<>
			<TelaCabecalho
				botaoVoltar={false}
				// botaoDireita={<IconButton icon={<Icon as={Plus} color="gray.900" />} />}
			>
				Meus Anúncios
			</TelaCabecalho>
			<HStack mt={8} mb={5} px={6} justifyContent="space-between" alignItems="center">
				<Text>9 anúncios</Text>
				<Select
					selectedValue={anunciosFiltro}
					minWidth={32}
					_selectedItem={{ bgColor: "gray.300" }}
					onValueChange={(item) => defAnunciosFiltro(item)}
				>
					<Select.Item label="Todos" value="Todos" />
					<Select.Item label="Ativos" value="Ativos" />
					<Select.Item label="Inativos" value="Inativos" />
				</Select>
			</HStack>

			<FlatList
				my={6}
				px={6}
				data={meusAnuncios}
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
			<Box></Box>
		</>
	);
}
