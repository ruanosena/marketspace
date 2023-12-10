import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Badge, Box, HStack, Image, Text, VStack } from "native-base";

import { ProdutoDTO } from "@dto/produtoDTO";
import { Api } from "@servico/api";
import MoedaFormatador from "@util/MoedaFormatador";
import useAut from "@hook/useAut";

type Props = TouchableOpacityProps & {
	dados: ProdutoDTO;
	mostrarDesativado?: boolean;
};

export function AnuncioCartao({ dados, mostrarDesativado = false, ...rest }: Props) {
	const { usuario } = useAut();

	return !mostrarDesativado && !dados.is_active ? null : (
		<TouchableOpacity {...rest}>
			<VStack maxW={160}>
				<Box height={100} width="auto" borderRadius="md" overflow="hidden">
					{dados.product_images[0] && (
						<Image
							source={{ uri: `${Api.defaults.baseURL}/images/${dados.product_images[0].path}` }}
							height={100}
							width="full"
							alt="Imagem do produto no catálogo"
							resizeMode="cover"
							position="absolute"
						/>
					)}
					<HStack justifyContent="space-between">
						{dados.user && (
							<Image
								mt={1}
								ml={1}
								w={8}
								h={8}
								borderRadius="full"
								borderWidth={1}
								borderColor="gray.50"
								source={{
									uri: `${Api.defaults.baseURL}/images/${dados.user.avatar}`,
								}}
								alt="Foto da pessoa"
							/>
						)}
						<Badge
							fontWeight="bold"
							bgColor={dados.is_new ? "blue.500" : "gray.700"}
							px={2}
							py={0}
							mt={1}
							mr={1}
							ml="auto"
							borderRadius="2xl"
							_text={{ color: "white", textTransform: "uppercase" }}
						>
							{dados.is_new ? "Novo" : "Usado"}
						</Badge>
					</HStack>
					{!dados.is_active && (
						<Box w="full" h="full" bgColor="gray.900" position="absolute" opacity={0.45} />
					)}
					{!dados.is_active && (
						<Text
							textTransform="uppercase"
							color="white"
							mt="auto"
							mb={2}
							ml={2}
							fontWeight="bold"
							fontSize="xs"
						>
							Anúncio desativado
						</Text>
					)}
				</Box>
				<Text color="gray.700" fontSize="sm">
					{dados.name}
				</Text>
				<Text color="gray.900" fontWeight="bold" fontSize="md">
					<Text color="gray.900" fontWeight="bold" fontSize="sm">
						R$
					</Text>{" "}
					{MoedaFormatador(dados.price)}
				</Text>
			</VStack>
		</TouchableOpacity>
	);
}
