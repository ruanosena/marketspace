import { Box, HStack, Icon, IconButton, Text, VStack, useToast } from "native-base";
import { Entrada } from "./Entrada";
import { MagnifyingGlass, Sliders } from "phosphor-react-native";
import { FiltrosModal } from "./FiltrosModal";
import { useState } from "react";
import { ProdutosFiltrosProps } from "@ctx/ProdutosContexto";
import useProdutos from "@hook/useProdutos";
import { AppErro } from "@util/AppErro";

export function CatalogoCabecalho() {
	const [consulta, defConsulta] = useState("");
	const { defFiltros, buscarProdutos } = useProdutos();
	const torrada = useToast();

	function lidarAplicarFiltros(filtros: Exclude<ProdutosFiltrosProps, "query"> = {}) {
		try {
			defFiltros({
				...filtros,
				query: consulta,
			});
			buscarProdutos();
		} catch (erro) {
			console.log(erro);
			let mensagem = erro instanceof AppErro ? erro.message : "Não foi possível aplicar os filtros";

			torrada.show({ title: mensagem, placement: "bottom", bgColor: "red.300" });
		}
	}

	return (
		<VStack px={6} space={3}>
			<Text color="gray.600">Compre produtos variados</Text>
			<Entrada
				placeholder="Buscar anúncio"
				value={consulta}
				onChangeText={defConsulta}
				InputRightElement={
					<HStack
						alignItems="center"
						space={1}
						divider={<Box height={5} borderWidth={1} borderRightColor="gray.500" />}
					>
						<IconButton
							onPress={() => lidarAplicarFiltros()}
							icon={<Icon as={MagnifyingGlass} color="gray.700" />}
						/>
						<FiltrosModal aoMudarFiltros={lidarAplicarFiltros} />
					</HStack>
				}
			/>
		</VStack>
	);
}
