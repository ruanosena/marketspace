import { TouchableHighlight, TouchableHighlightProps } from "react-native";
import { Box, HStack, Heading, Icon, Text, VStack } from "native-base";
import { Tag, ArrowRight } from "phosphor-react-native";
import { Botao } from "./Botao";
import useProdutos from "@hook/useProdutos";
import { useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

type Props = TouchableHighlightProps & {};

export function CTAAnuncios({ ...rest }: Props) {
	const { meusProdutos, buscarMeusProdutos } = useProdutos();
	const navegacao = useNavigation();

	function lidarAbrirMeusAnuncios() {
		// @ts-ignore: Aninhamento de telas na navegação
		navegacao.navigate("anuncios", { screen: "meus_anuncios" });
	}

	useFocusEffect(
		useCallback(() => {
			try {
				buscarMeusProdutos();
			} catch (erro) {
				console.log(erro);
			}
		}, [])
	);

	return (
		<TouchableHighlight {...rest}>
			<Box my={8} px={6}>
				<Text color="gray.600" numberOfLines={1}>
					Seus produtos anunciados para venda
				</Text>
				<HStack mt={3} py={3} px={4} alignItems="center" bgColor="lightBlue.300" borderRadius="md">
					<Icon as={Tag} color="blue.500" mr={4} />

					<VStack flex={1}>
						<Heading fontSize="lg" color="gray.700">
							{meusProdutos.reduce((total, anuncio) => {
								anuncio.is_active && total++;
								return total;
							}, 0)}
						</Heading>
						<Text color="gray.700" fontSize="xs" numberOfLines={1}>
							anúncios ativos
						</Text>
					</VStack>

					<Botao
						onPress={lidarAbrirMeusAnuncios}
						variant="link"
						_text={{ color: "blue.500", fontSize: "xs" }}
						rightIcon={<Icon as={ArrowRight} color="blue.500" />}
						bgColor="transparent"
					>
						Meus anúncios
					</Botao>
				</HStack>
			</Box>
		</TouchableHighlight>
	);
}
