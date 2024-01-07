import { Alert, Dimensions } from "react-native";
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
	useToast,
} from "native-base";
import Carrossel from "react-native-reanimated-carousel";
import {
	Bank,
	Barcode,
	CreditCard,
	Money,
	PencilLine,
	Power,
	QrCode,
	TrashSimple,
} from "phosphor-react-native";
import { Botao } from "@comp/Botao";
import { TelaCabecalho } from "@comp/TelaCabecalho";
import { useNavigation, useRoute } from "@react-navigation/native";

import meuAnuncio1 from "@asset/meuanuncio1.png";
import meuAnuncio2 from "@asset/meuanuncio2.png";
import fotoPerfil from "@asset/fotoPerfil.png";
import { AnunciosNavegadorRotasProps } from "@rota/anuncios.rotas";
import { useEffect, useState } from "react";
import useProdutos from "@hook/useProdutos";
import { ProdutoDTO } from "@dto/produtoDTO";
import { AppErro } from "@util/AppErro";
import MoedaFormatador from "@util/MoedaFormatador";
import { Api } from "@servico/api";

type RotaParamsProps = {
	anuncioId: string;
};

export function Detalhes() {
	const [estaDesativando, defEstaDesativando] = useState(false);
	const [estaExcluindo, defEstaExcluindo] = useState(false);
	const navegacao = useNavigation<AnunciosNavegadorRotasProps>();
	const tamanho = Dimensions.get("window").width;
	const [produto, defProduto] = useState<ProdutoDTO>();
	const { buscarProduto, alterarVisibilidadeProduto, excluirProduto } = useProdutos();
	const rota = useRoute();
	const torrada = useToast();
	const { anuncioId: produtoId } = rota.params as RotaParamsProps;

	function lidarEditar() {
		navegacao.navigate("editar", { anuncioId: produtoId });
	}

	async function lidarDesativar() {
		try {
			defEstaDesativando(true);
			await alterarVisibilidadeProduto(produtoId, !produto?.is_active);
			navegacao.navigate("meus_anuncios");
		} catch (erro) {
			let mensagem =
				erro instanceof AppErro ? erro.message : "Não foi possível desativar o anúncio do produto";

			torrada.show({ title: mensagem, placement: "bottom", bgColor: "red.300" });
			defEstaDesativando(false);
		}
	}

	async function lidarExcluir() {
		try {
			Alert.alert("Excluir", "Deseja realmente excluir este anúncio?", [
				{ text: "Cancelar", style: "cancel" },
				{
					text: "Excluir",
					onPress: async () => {
						defEstaExcluindo(true);
						await excluirProduto(produtoId);
						navegacao.navigate("meus_anuncios");
					},
				},
			]);
		} catch (erro) {
			let mensagem =
				erro instanceof AppErro ? erro.message : "Não foi possível excluir o anúncio do produto";

			torrada.show({ title: mensagem, placement: "bottom", bgColor: "red.300" });
			defEstaExcluindo(false);
		}
	}

	useEffect(() => {
		if (produtoId) {
			buscarProduto(produtoId)
				.then(defProduto)
				.catch((erro) => {
					let mensagem =
						erro instanceof AppErro
							? erro.message
							: "Não foi possível carregar o anúncio do produto";

					torrada.show({ title: mensagem, placement: "bottom", bgColor: "red.300" });
				});
		}
	}, [produtoId]);

	return (
		<>
			<TelaCabecalho
				botaoDireita={
					<IconButton onPress={lidarEditar} icon={<Icon as={PencilLine} color="gray.900" />} />
				}
			/>
			<ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
				<Carrossel
					loop
					width={tamanho}
					height={280}
					autoPlay={false}
					data={produto?.product_images || []}
					scrollAnimationDuration={1000}
					renderItem={({ item }) => (
						<Box flex={1} justifyContent="center">
							<Image
								position="absolute"
								w="full"
								h="full"
								source={{ uri: `${Api.defaults.baseURL}/images/${item.path}` }}
								alt={item.id}
								resizeMode="cover"
							/>
							{!produto?.is_active && (
								<Box w="full" h="full" bgColor="gray.900" position="absolute" opacity={0.6} />
							)}
							{!produto?.is_active && (
								<Text textAlign="center" textTransform="uppercase" color="white" fontSize="sm">
									Anúncio desativado
								</Text>
							)}
						</Box>
					)}
				/>
				<VStack px={6} space={6} mt={5}>
					<HStack alignItems="center" space={2}>
						{produto?.user && (
							<Image
								w={8}
								h={8}
								borderRadius="full"
								borderWidth={2}
								borderColor="blue.300"
								source={{ uri: `${Api.defaults.baseURL}/images/${produto.user.avatar}` }}
								alt="Imagem foto do perfil"
							/>
						)}
						<Heading fontSize="sm">{produto?.user?.name}</Heading>
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
								{produto?.is_new ? "Novo" : "Usado"}
							</Text>
						</Pressable>
					</Box>

					<HStack space={3} alignItems="center">
						<Heading color="gray.900" fontSize="lg" flex={1}>
							{produto?.name}
						</Heading>
						<Text fontSize="lg" color="blue.300" fontFamily="heading">
							<Text fontSize="sm" color="blue.300">
								R$
							</Text>{" "}
							{MoedaFormatador(produto?.price || NaN)}
						</Text>
					</HStack>
					<Text color="gray.700" fontSize="sm">
						{produto?.description}
					</Text>

					<VStack space={4}>
						<HStack space={3} alignItems="center">
							<Heading fontSize="sm" color="gray.700">
								Aceita troca?
							</Heading>
							<Text color="gray.700">{produto?.accept_trade ? "Sim" : "Não"}</Text>
						</HStack>
						<VStack space={2}>
							<Heading fontSize="sm" color="gray.700">
								Meios de pagamento:
							</Heading>
							{produto?.payment_methods.map((metodo) => {
								switch (metodo.key) {
									case "boleto":
										return (
											<Box flexDir="row" key={metodo.name + metodo.key}>
												<Icon as={Barcode} mr={2} />
												<Text color="gray.700" textTransform="capitalize">
													Boleto
												</Text>
											</Box>
										);

									case "pix":
										return (
											<Box flexDir="row" key={metodo.name + metodo.key}>
												<Icon as={QrCode} mr={2} />
												<Text color="gray.700" textTransform="capitalize">
													Pix
												</Text>
											</Box>
										);
									case "deposit":
										return (
											<Box flexDir="row" key={metodo.name + metodo.key}>
												<Icon as={Bank} mr={2} />
												<Text color="gray.700" textTransform="capitalize">
													Depósito Bancário
												</Text>
											</Box>
										);
									case "card":
										return (
											<Box flexDir="row" key={metodo.name + metodo.key}>
												<Icon as={CreditCard} mr={2} />
												<Text color="gray.700" textTransform="capitalize">
													Cartão de crédito
												</Text>
											</Box>
										);
									case "cash":
										return (
											<Box flexDir="row" key={metodo.name + metodo.key}>
												<Icon as={Money} mr={2} />
												<Text color="gray.700" textTransform="capitalize">
													Dinheiro
												</Text>
											</Box>
										);
								}
							})}
						</VStack>
					</VStack>

					<Button.Group direction="column" space={2}>
						<Botao
							leftIcon={<Icon as={Power} />}
							isLoading={estaDesativando}
							onPress={lidarDesativar}
						>
							{produto?.is_active ? "Desativar Anúncio" : "Ativar Anúncio"}
						</Botao>
						<Botao
							bgColor="gray.300"
							leftIcon={<Icon as={TrashSimple} color="gray.700" />}
							_text={{ color: "gray.700" }}
							isLoading={estaExcluindo}
							onPress={lidarExcluir}
						>
							Excluir anúncio
						</Botao>
					</Button.Group>
				</VStack>
			</ScrollView>
		</>
	);
}
