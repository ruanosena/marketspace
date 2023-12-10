import { useCallback, useState } from "react";
import { Box, FlatList, HStack, Icon, IconButton, Select, Text, useToast } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Plus } from "phosphor-react-native";
import { TelaCabecalho } from "@comp/TelaCabecalho";
import { AnuncioCartao } from "@comp/AnuncioCartao";
import { AnunciosNavegadorRotasProps } from "@rota/anuncios.rotas";
import { Api } from "@servico/api";
import { AppErro } from "@util/AppErro";
import { Carregando } from "@comp/Carregando";
import { ProdutoDTO } from "@dto/produtoDTO";

type AnunciosFiltros = "Todos" | "Ativos" | "Inativos";

export function MeusAnuncios() {
	const [estaBuscando, defEstaBuscando] = useState(true);
	const [meusProdutos, defMeusProdutos] = useState<ProdutoDTO[]>();
	const [anunciosFiltro, defAnunciosFiltro] = useState("Todos");
	const navegacao = useNavigation<AnunciosNavegadorRotasProps>();
	const torrada = useToast();

	function lidarAbrirAnuncio() {
		navegacao.navigate("detalhes");
	}

	async function buscarProdutos() {
		try {
			const resposta = await Api.get("/users/products");

			defMeusProdutos(resposta.data);
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
			if (anunciosFiltro == "Todos") {
				buscarProdutos();
			}
		}, [anunciosFiltro])
	);

	return estaBuscando ? (
		<Carregando />
	) : (
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
				data={meusProdutos}
				keyExtractor={(item, indice) => "anuncio-" + item + indice}
				renderItem={({ item }) => (
					<AnuncioCartao
						onPress={() => lidarAbrirAnuncio()}
						dados={item}
						mostrarDesativado
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
