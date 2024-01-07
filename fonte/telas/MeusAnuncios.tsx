import { useCallback, useEffect, useState } from "react";
import { Box, FlatList, HStack, Icon, IconButton, Select, Text, useToast } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TelaCabecalho } from "@comp/TelaCabecalho";
import { AnuncioCartao } from "@comp/AnuncioCartao";
import { AnunciosNavegadorRotasProps } from "@rota/anuncios.rotas";
import { AppErro } from "@util/AppErro";
import { Carregando } from "@comp/Carregando";
import { ProdutoDTO } from "@dto/produtoDTO";
import useProdutos from "@hook/useProdutos";

type AnunciosFiltros = "Todos" | "Ativos" | "Inativos";

export function MeusAnuncios() {
	const [estaBuscando, defEstaBuscando] = useState(true);
	const [anunciosFiltro, defAnunciosFiltro] = useState<AnunciosFiltros>("Todos");
	const [meusProdutosFiltrados, defMeusProdutosFiltrados] = useState<ProdutoDTO[]>([]);
	const { buscarMeusProdutos, meusProdutos } = useProdutos();

	const navegacao = useNavigation<AnunciosNavegadorRotasProps>();
	const torrada = useToast();

	function lidarAbrirAnuncio(id: string) {
		navegacao.navigate("detalhes", { anuncioId: id });
	}

	useEffect(() => {
		if (anunciosFiltro == "Todos") {
			defMeusProdutosFiltrados(meusProdutos);
		} else if (anunciosFiltro == "Ativos") {
			defMeusProdutosFiltrados(meusProdutos.filter((a) => a.is_active));
		} else if (anunciosFiltro == "Inativos") {
			defMeusProdutosFiltrados(meusProdutos.filter((a) => !a.is_active));
		}
	}, [anunciosFiltro, meusProdutos]);

	useFocusEffect(
		useCallback(() => {
			try {
				buscarMeusProdutos();
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
		<>
			<TelaCabecalho
				botaoVoltar={false}
				// botaoDireita={<IconButton icon={<Icon as={Plus} color="gray.900" />} />}
			>
				Meus Anúncios
			</TelaCabecalho>
			<HStack mt={8} mb={5} px={6} justifyContent="space-between" alignItems="center">
				<Text>
					{meusProdutosFiltrados.length}{" "}
					{meusProdutosFiltrados.length == 1 ? "anúncio" : "anúncios"}
				</Text>
				<Select
					selectedValue={anunciosFiltro}
					minWidth={32}
					_selectedItem={{ bgColor: "gray.300" }}
					onValueChange={(item) => defAnunciosFiltro(item as AnunciosFiltros)}
				>
					<Select.Item label="Todos" value="Todos" />
					<Select.Item label="Ativos" value="Ativos" />
					<Select.Item label="Inativos" value="Inativos" />
				</Select>
			</HStack>

			<FlatList
				my={6}
				px={6}
				data={meusProdutosFiltrados}
				keyExtractor={(item, indice) => "anuncio-" + item + indice}
				renderItem={({ item }) => (
					<AnuncioCartao
						onPress={() => lidarAbrirAnuncio(item.id)}
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
