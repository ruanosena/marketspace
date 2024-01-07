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
	useToast,
} from "native-base";
import { Plus } from "phosphor-react-native";
import { TelaCabecalho } from "@comp/TelaCabecalho";
import { Entrada } from "@comp/Entrada";
import { Botao } from "@comp/Botao";
import { useNavigation } from "@react-navigation/native";
import { CatalogoNavegadorRotasProps } from "@rota/catalogo.rotas";
import * as ImagemSelecionador from "expo-image-picker";
import * as SistemaArquivo from "expo-file-system";
import { Controller, useForm } from "react-hook-form";
import { Api } from "@servico/api";
import useAut from "@hook/useAut";
import useProdutos from "@hook/useProdutos";

export type FormDadosProps = {
	titulo: string;
	descricao: string;
	ehNovo: string;
	preco: string;
	aceitaTroca: boolean;
	metodosPagamento: string[];
};

export function Criar() {
	const [estaEnviando, defEstaEnviando] = useState(false);
	const [fotos, defFotos] = useState<ImagemSelecionador.ImagePickerAsset[]>([]);
	const { criarProduto, enviarFotos } = useProdutos();
	const navegacao = useNavigation<CatalogoNavegadorRotasProps>();
	const torrada = useToast();

	const {
		control: controle,
		handleSubmit: lidarEnviar,
		formState: { errors: erros },
	} = useForm<FormDadosProps>({
		defaultValues: {
			aceitaTroca: false,
			ehNovo: "true",
		},
	});

	async function lidarCriarAnuncio(dados: FormDadosProps) {
		try {
			defEstaEnviando(true);

			const produto = await criarProduto(dados);

			await enviarFotos(produto.id, fotos);

			navegacao.navigate("inicio");
		} catch (erro) {
			console.log(erro);
			defEstaEnviando(false);
		}
		// navegacao.navigate("visualizar");
	}

	async function lidarCancelar() {
		navegacao.goBack();
	}

	async function lidarSelecionarFotos() {
		try {
			const fotosSelecionadas = await ImagemSelecionador.launchImageLibraryAsync({
				mediaTypes: ImagemSelecionador.MediaTypeOptions.Images,
				quality: 1,
				aspect: [16, 9],
				allowsEditing: true,
				selectionLimit: 3 - fotos.length,
			});

			if (fotosSelecionadas.canceled) return;

			if (fotosSelecionadas.assets.length) {
				for (let i = 0; i < fotosSelecionadas.assets.length; i++) {
					let fotoInfo = await SistemaArquivo.getInfoAsync(fotosSelecionadas.assets[i].uri);
					if (fotoInfo.exists && fotoInfo.size / 1024 / 1024 > 5) {
						return torrada.show({
							title: "Imagem é muito grande, escolha uma de até 5MB",
							placement: "bottom",
							bgColor: "red.300",
						});
					}
				}
			}

			defFotos((fotos) => [...fotos, ...fotosSelecionadas.assets]);
		} catch (erro) {
			console.log(erro);
		}
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
							{fotos.map((imagem) => (
								<Box key={imagem.fileName} rounded="md" overflow="hidden" w={100} h={100}>
									<Image
										w={100}
										h={100}
										resizeMode="cover"
										source={{ uri: imagem.uri }}
										alt="Imagem do produto em anúncio"
									/>
								</Box>
							))}
							{fotos.length < 3 && (
								<TouchableOpacity onPress={lidarSelecionarFotos}>
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
			</ScrollView>
			<Box px={6} py={5} bgColor="white">
				<Button.Group space={3}>
					<Botao flex={1} onPress={lidarCancelar} bgColor="gray.300" _text={{ color: "gray.700" }}>
						Cancelar
					</Botao>
					<Botao flex={1} isLoading={estaEnviando} onPress={lidarEnviar(lidarCriarAnuncio)}>
						Avançar
					</Botao>
				</Button.Group>
			</Box>
		</>
	);
}
