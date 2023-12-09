import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { Botao } from "./Botao";
import { Plus } from "phosphor-react-native";

import perfilPlaceholder from "@asset/perfilPlaceholder.png";
import { useNavigation } from "@react-navigation/native";
import { CatalogoNavegadorRotasProps } from "@rota/catalogo.rotas";
import useAut from "@hook/useAut";
import { Api } from "@servico/api";

export function InicioCabecalho() {
	const navegacao = useNavigation<CatalogoNavegadorRotasProps>();
	const { usuario } = useAut();

	function lidarNovoAnuncio() {
		navegacao.navigate("criar");
	}

	return (
		<HStack alignItems="center" px={6} pt={6}>
			<Image
				w={12}
				h={12}
				borderRadius="full"
				mr={2}
				borderWidth={2}
				borderColor="blue.300"
				source={
					usuario ? { uri: `${Api.defaults.baseURL}/images/${usuario.avatar}` } : perfilPlaceholder
				}
				alt="Imagem foto do perfil"
			/>
			<VStack flex={1}>
				<Text color="gray.900" fontSize="sm">
					Boas vindas,
				</Text>
				<Heading fontSize="sm">{usuario.name}!</Heading>
			</VStack>
			<Botao
				rounded="lg"
				_text={{ color: "gray.50", fontSize: "xs" }}
				leftIcon={<Icon as={Plus} color="gray.100" />}
				onPress={lidarNovoAnuncio}
			>
				Criar anúncio
			</Botao>
		</HStack>
	);
}
