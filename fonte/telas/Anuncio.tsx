import { Dimensions } from "react-native";
import {
	Box,
	Button,
	HStack,
	Heading,
	Icon,
	IconButton,
	Image,
	Pressable,
	ScrollView,
	Text,
	VStack,
} from "native-base";
import Carrossel from "react-native-reanimated-carousel";
import { Bank, Barcode, Power, QrCode, TrashSimple, WhatsappLogo } from "phosphor-react-native";
import { Botao } from "@comp/Botao";
import { TelaCabecalho } from "@comp/TelaCabecalho";

import meuAnuncio1 from "@asset/meuanuncio1.png";
import meuAnuncio2 from "@asset/meuanuncio2.png";
import fotoPerfil from "@asset/fotoPerfil.png";

export function Anuncio() {
	const tamanho = Dimensions.get("window").width;

	return (
		<>
			<TelaCabecalho botaoVoltar />
			<ScrollView bgColor="white">
				<Carrossel
					loop
					width={tamanho}
					height={280}
					autoPlay={false}
					data={[meuAnuncio1, meuAnuncio2]}
					scrollAnimationDuration={1000}
					renderItem={({ index, item }) => (
						<Box flex={1} justifyContent="center">
							<Image
								position="absolute"
								w="full"
								h="full"
								source={item}
								alt="Imagem do anúncio"
								resizeMode="cover"
							/>
							{index == 1 && (
								<Box w="full" h="full" bgColor="gray.900" position="absolute" opacity={0.6} />
							)}
							{index == 1 && (
								<Text textAlign="center" textTransform="uppercase" color="white" fontSize="sm">
									Anúncio desativado
								</Text>
							)}
						</Box>
					)}
				/>
				<VStack px={6} space={6} py={6} bgColor="gray.100" borderBottomRadius="2xl">
					<HStack alignItems="center" space={2}>
						<Image
							w={8}
							h={8}
							borderRadius="full"
							borderWidth={2}
							borderColor="blue.300"
							source={fotoPerfil}
							alt="Imagem foto do perfil"
						/>
						<Heading fontSize="sm">Maria Gomes</Heading>
					</HStack>

					<Box alignItems="flex-start">
						<Pressable
							bgColor="gray.300"
							textTransform="uppercase"
							_pressed={{ bgColor: "blue.300" }}
							rounded="full"
							flexDir="row"
							py={1}
							px={4}
							mr={1}
						>
							<Text color="gray.700" textTransform="uppercase">
								Usado
							</Text>
						</Pressable>
					</Box>

					<HStack space={3} alignItems="center">
						<Heading color="gray.900" fontSize="lg" flex={1}>
							Luminária pendente
						</Heading>
						<Text fontSize="lg" color="blue.300" fontFamily="heading">
							<Text fontSize="sm" color="blue.300">
								R$
							</Text>{" "}
							45,00
						</Text>
					</HStack>
					<Text color="gray.700" fontSize="sm">
						Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget
						maecenas urna mattis cursus.
					</Text>

					<VStack space={4}>
						<HStack space={3} alignItems="center">
							<Heading fontSize="sm" color="gray.700">
								Aceita troca?
							</Heading>
							<Text color="gray.700">Sim</Text>
						</HStack>
						<VStack space={2}>
							<Heading fontSize="sm" color="gray.700">
								Meios de pagamento:
							</Heading>
							<Box flexDir="row">
								<Icon as={Barcode} mr={2} />
								<Text color="gray.700" textTransform="capitalize">
									Boleto
								</Text>
							</Box>
							<Box flexDir="row">
								<Icon as={QrCode} mr={2} />
								<Text color="gray.700" textTransform="capitalize">
									Pix
								</Text>
							</Box>
							<Box flexDir="row">
								<Icon as={Bank} mr={2} />
								<Text color="gray.700" textTransform="capitalize">
									Depósito Bancário
								</Text>
							</Box>
						</VStack>
					</VStack>
				</VStack>
			</ScrollView>
			<HStack py={5} px={6} justifyContent="space-between" alignItems="flex-end" bgColor="white">
				<Text fontSize="xl" color="blue.500" fontFamily="heading">
					<Text fontSize="sm" color="blue.500">
						R$
					</Text>{" "}
					45,00
				</Text>
				<Botao
					bgColor="blue.300"
					leftIcon={<Icon as={WhatsappLogo} color="gray.50" />}
					_text={{ color: "gray.50" }}
				>
					Entrar em contato
				</Botao>
			</HStack>
		</>
	);
}
