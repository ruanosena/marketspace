import { useState } from "react";
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
} from "native-base";
import { Plus } from "phosphor-react-native";
import { TelaCabecalho } from "@comp/TelaCabecalho";
import { Entrada } from "@comp/Entrada";
import { Botao } from "@comp/Botao";
import { useNavigation } from "@react-navigation/native";
import { CatalogoNavegadorRotasProps } from "@rota/catalogo.rotas";

export function Criar() {
	const [anuncioImagens, defAnuncioImagens] = useState([]);
	const navegacao = useNavigation<CatalogoNavegadorRotasProps>();

	function lidarCriarAnuncio() {
		navegacao.navigate("visualizar");
	}

	return (
		<>
			<TelaCabecalho botaoVoltar>Criar anúncio</TelaCabecalho>
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
							{anuncioImagens.map((imagem) => (
								<Box rounded="md" overflow="hidden" w={100} h={100}>
									<Image
										w={100}
										h={100}
										resizeMode="cover"
										source={imagem}
										alt="Imagem do produto em anúncio"
									/>
								</Box>
							))}
							{anuncioImagens.length < 3 && (
								<TouchableOpacity>
									<Center rounded="md" overflow="hidden" w={100} h={100} bgColor="gray.300">
										<Icon as={Plus} color="gray.500" />
									</Center>
								</TouchableOpacity>
							)}
						</HStack>
					</VStack>

					<VStack space={4}>
						<Heading fontSize="sm" color="gray.700">
							Sobre o produto
						</Heading>

						<Entrada placeholder="Título do anúncio" />
						<Entrada multiline numberOfLines={6} placeholder="Descrição do produto" />
						<Radio.Group
							name="estadoProduto"
							defaultValue="Novo"
							space={5}
							direction="row"
							_radio={{ colorScheme: "blue" }}
						>
							<Radio value="Novo" _text={{ fontSize: "md" }}>
								Produto novo
							</Radio>
							<Radio value="Usado" _text={{ fontSize: "md" }}>
								Produto usado
							</Radio>
						</Radio.Group>
					</VStack>

					<VStack space={4}>
						<Heading fontSize="sm" color="gray.700">
							Venda
						</Heading>
						<Entrada
							leftElement={
								<Text fontSize="md" pl={4}>
									R$
								</Text>
							}
							placeholder="Valor do produto"
						/>
						<Box>
							<Heading fontSize="sm" color="gray.700">
								Aceita troca?
							</Heading>
							<Switch onTrackColor="blue.300" mr="auto" />
						</Box>
						<Box>
							<Heading fontSize="sm" color="gray.700" mb={3}>
								Meios de pagamento aceitos
							</Heading>
							<VStack space={2}>
								<Checkbox value="boleto" _checked={{ bgColor: "blue.300", borderWidth: 0, p: 1 }}>
									Boleto
								</Checkbox>
								<Checkbox value="pix" _checked={{ bgColor: "blue.300", borderWidth: 0, p: 1 }}>
									Pix
								</Checkbox>
								<Checkbox value="dinheiro" _checked={{ bgColor: "blue.300", borderWidth: 0, p: 1 }}>
									Dinheiro
								</Checkbox>
								<Checkbox
									value="cartao_credito"
									_checked={{ bgColor: "blue.300", borderWidth: 0, p: 1 }}
								>
									Cartão de crédito
								</Checkbox>
								<Checkbox
									value="deposito_bancario"
									_checked={{ bgColor: "blue.300", borderWidth: 0, p: 1 }}
								>
									Depósito Bancário
								</Checkbox>
							</VStack>
						</Box>
					</VStack>
				</VStack>
			</ScrollView>
			<Box px={6} py={5} bgColor="white">
				<Button.Group space={3}>
					<Botao flex={1} bgColor="gray.300" _text={{ color: "gray.700" }}>
						Cancelar
					</Botao>
					<Botao flex={1} onPress={lidarCriarAnuncio}>
						Avançar
					</Botao>
				</Button.Group>
			</Box>
		</>
	);
}
