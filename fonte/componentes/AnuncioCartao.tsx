import { Badge, Box, HStack, IPressableProps, Image, Pressable, Text, VStack } from "native-base";

import item1 from "@asset/item1.png";
import item2 from "@asset/item2.png";
import pessoa1 from "@asset/pessoa1.png";
import pessoa2 from "@asset/pessoa2.png";

type Props = IPressableProps & {
	dados: number;
};

export function AnuncioCartao({ dados = 1, ...rest }: Props) {
	return (
		<Pressable {...rest}>
			<VStack>
				<Box height={100} width={150} borderRadius="md" overflow="hidden">
					<Image
						source={dados == 1 ? item1 : item2}
						alt="Imagem do item no catálogo"
						resizeMode="contain"
						position="absolute"
					/>
					<HStack justifyContent="space-between">
						<Image
							mt={1}
							ml={1}
							w={8}
							h={8}
							borderRadius="full"
							borderWidth={1}
							borderColor="gray.50"
							source={dados == 1 ? pessoa1 : pessoa2}
							alt="Foto da pessoa"
						/>
						<Badge
							fontWeight="bold"
							bgColor={dados == 1 ? "gray.700" : "blue.500"}
							px={2}
							py={0}
							mt={1}
							mr={1}
							borderRadius="2xl"
							_text={{ color: "white", textTransform: "uppercase" }}
						>
							{dados == 1 ? "Usado" : "Novo"}
						</Badge>
					</HStack>
				</Box>
				<Text color="gray.700" fontSize="md">
					{dados == 1 ? "Tênis vermelho" : "Bicicleta"}
				</Text>
				<Text color="gray.900" fontWeight="bold" fontSize="lg">
					<Text color="gray.900" fontWeight="bold" fontSize="md">
						R$
					</Text>{" "}
					{dados == 1 ? "59,90" : "120,00"}
				</Text>
			</VStack>
		</Pressable>
	);
}
