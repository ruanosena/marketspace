import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
	Box,
	Text,
	Heading,
	VStack,
	HStack,
	Image,
	Icon,
	Center,
	ScrollView,
	Radio,
	Switch,
	Checkbox,
	Button,
	useToast,
} from "native-base";
import { Plus } from "phosphor-react-native";
import { TelaCabecalho } from "@comp/TelaCabecalho";
import { Entrada } from "@comp/Entrada";
import { Botao } from "@comp/Botao";

import meuAnuncio1 from "@asset/meuanuncio1.png";
import { useNavigation, useRoute } from "@react-navigation/native";
import useProdutos from "@hook/useProdutos";
import { ProdutoDTO } from "@dto/produtoDTO";
import { AppErro } from "@util/AppErro";
import { Api } from "@servico/api";
import { Controller, useForm } from "react-hook-form";
import { CatalogoNavegadorRotasProps } from "@rota/catalogo.rotas";

type RotaParamsProps = {
	anuncioId: string;
};
export type FormDadosProps = {
	titulo: string;
	descricao: string;
	ehNovo: string;
	preco: string;
	aceitaTroca: boolean;
	metodosPagamento: string[];
};

export function Editar() {
	const [produto, defProduto] = useState<ProdutoDTO>();
	const rota = useRoute();
	const { anuncioId } = rota.params as RotaParamsProps;
	const { buscarProduto } = useProdutos();
	const torrada = useToast();
	const navegacao = useNavigation<CatalogoNavegadorRotasProps>();

	const {
		control: controle,
		handleSubmit: lidarEnviar,
		formState: { errors: erros },
		setValue: defValor,
	} = useForm<FormDadosProps>();

	function lidarCancelar() {
		navegacao.goBack();
	}

	function lidarAvancar() {
		navegacao.navigate("visualizar");
	}

	useEffect(() => {
		if (produto) {
			defValor("titulo", produto.name);
			defValor("descricao", produto.description);
			defValor("aceitaTroca", produto.accept_trade);
			defValor("ehNovo", produto.is_new ? "true" : "false");
			defValor("preco", produto.price + "");
			defValor(
				"metodosPagamento",
				produto.payment_methods.map((mp) => mp.key)
			);
		}
	}, [produto]);

	useEffect(() => {
		if (anuncioId) {
			buscarProduto(anuncioId)
				.then(defProduto)
				.catch((erro) => {
					let mensagem =
						erro instanceof AppErro
							? erro.message
							: "Não foi possível carregar o anúncio do produto";

					torrada.show({ title: mensagem, placement: "bottom", bgColor: "red.300" });
				});
		}
	}, [anuncioId]);

	return (
		<>
			<TelaCabecalho botaoVoltar>Editar anúncio</TelaCabecalho>
			<ScrollView bgColor="white">
				<VStack px={6} py={6} space={8} bgColor="gray.100" borderBottomRadius="2xl">
					<VStack space={4}>
						<Box>
							<Heading fontSize="sm" color="gray.700" mb={1}>
								Imagens
							</Heading>
							<Text color="gray.600">
								Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
							</Text>
						</Box>
						<HStack space={2}>
							{produto?.product_images.map((img) => (
								<Box key={img.id} rounded="md" overflow="hidden" w={100} h={100}>
									<Image
										w={100}
										h={100}
										resizeMode="cover"
										source={{ uri: `${Api.defaults.baseURL}/images/${img.path}` }}
										alt="Imagem do produto em anúncio"
									/>
								</Box>
							))}
							{!produto?.product_images ||
								(produto.product_images.length < 3 && (
									<TouchableOpacity>
										<Center rounded="md" overflow="hidden" w={100} h={100} bgColor="gray.300">
											<Icon as={Plus} color="gray.500" />
										</Center>
									</TouchableOpacity>
								))}
						</HStack>
					</VStack>

					<VStack space={4}>
						<Heading fontSize="sm" color="gray.700">
							Sobre o produto
						</Heading>

						<Controller
							name="titulo"
							control={controle}
							render={({ field: { onChange, value } }) => (
								<Entrada
									placeholder="Título do anúncio"
									value={value}
									onChangeText={onChange}
									erro={erros.titulo?.message}
								/>
							)}
						/>
						<Controller
							name="descricao"
							control={controle}
							render={({ field: { onChange, value } }) => (
								<Entrada
									multiline
									numberOfLines={6}
									placeholder="Descrição do produto"
									value={value}
									onChangeText={onChange}
									erro={erros.descricao?.message}
								/>
							)}
						/>
						<Controller
							name="ehNovo"
							control={controle}
							render={({ field: { value, onChange } }) => (
								<Radio.Group
									name="ehNovo"
									value={value}
									onChange={onChange}
									space={5}
									direction="row"
									_radio={{ colorScheme: "blue" }}
								>
									<Radio value="true" _text={{ fontSize: "md" }}>
										Produto novo
									</Radio>
									<Radio value="false" _text={{ fontSize: "md" }}>
										Produto usado
									</Radio>
								</Radio.Group>
							)}
						/>
					</VStack>

					<VStack space={4}>
						<Heading fontSize="sm" color="gray.700">
							Venda
						</Heading>
						<Controller
							control={controle}
							name="preco"
							render={({ field: { onChange, value } }) => (
								<Entrada
									onChangeText={onChange}
									value={value}
									erro={erros.preco?.message}
									leftElement={
										<Text fontSize="md" pl={4}>
											R$
										</Text>
									}
									keyboardType="number-pad"
									placeholder="Valor do produto"
								/>
							)}
						/>
						<Box>
							<Heading fontSize="sm" color="gray.700">
								Aceita troca?
							</Heading>
							<Controller
								name="aceitaTroca"
								control={controle}
								render={({ field: { onChange, value } }) => (
									<Switch
										onValueChange={onChange}
										value={value}
										onTrackColor="blue.300"
										mr="auto"
									/>
								)}
							/>
						</Box>
						<Box>
							<Heading fontSize="sm" color="gray.700" mb={3}>
								Meios de pagamento aceitos
							</Heading>
							<Controller
								name="metodosPagamento"
								control={controle}
								render={({ field: { onChange, value } }) => (
									<Checkbox.Group onChange={onChange} value={value}>
										<VStack space={2}>
											<Checkbox
												value="boleto"
												_checked={{ bgColor: "blue.300", borderWidth: 0, p: 1 }}
											>
												Boleto
											</Checkbox>
											<Checkbox
												value="pix"
												_checked={{ bgColor: "blue.300", borderWidth: 0, p: 1 }}
											>
												Pix
											</Checkbox>
											<Checkbox
												value="cash"
												_checked={{ bgColor: "blue.300", borderWidth: 0, p: 1 }}
											>
												Dinheiro
											</Checkbox>
											<Checkbox
												value="card"
												_checked={{ bgColor: "blue.300", borderWidth: 0, p: 1 }}
											>
												Cartão de crédito
											</Checkbox>
											<Checkbox
												value="deposit"
												_checked={{ bgColor: "blue.300", borderWidth: 0, p: 1 }}
											>
												Depósito Bancário
											</Checkbox>
										</VStack>
									</Checkbox.Group>
								)}
							/>
						</Box>
					</VStack>
				</VStack>
				<Box px={6} py={5}>
					<Button.Group space={3}>
						<Botao
							flex={1}
							onPress={lidarCancelar}
							bgColor="gray.300"
							_text={{ color: "gray.700" }}
						>
							Cancelar
						</Botao>
						<Botao flex={1} onPress={lidarAvancar}>
							Avançar
						</Botao>
					</Button.Group>
				</Box>
			</ScrollView>
		</>
	);
}
