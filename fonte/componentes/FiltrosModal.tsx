import { useEffect, useState } from "react";
import {
	Box,
	Button,
	Center,
	Checkbox,
	HStack,
	Heading,
	Icon,
	IconButton,
	Modal,
	ScrollView,
	Switch,
	VStack,
} from "native-base";
import { Sliders } from "phosphor-react-native";
import { Botao } from "./Botao";
import { FiltroChip } from "./FiltroChip";
import { ProdutosFiltrosProps, MetodosPagamentoProps } from "@ctx/ProdutosContexto";

type CondicaoProps = "Novo" | "Usado" | string;

type Props = {
	aoMudarFiltros: (filtros: Exclude<ProdutosFiltrosProps, "query">) => void;
};

export function FiltrosModal({ aoMudarFiltros }: Props) {
	const [mostrarModal, defMostrarModal] = useState(false);
	const [condicao, defCondicao] = useState<CondicaoProps>("");
	const [aceitaTroca, defAceitaTroca] = useState(false);
	const [meiosPagamento, defMeiosPagamento] = useState<MetodosPagamentoProps>([]);

	function lidarResetarFiltros() {
		defCondicao("");
		defAceitaTroca(false);
		defMeiosPagamento([]);
	}

	function lidarAplicarFiltros() {
		aoMudarFiltros({
			accept_trade: aceitaTroca,
			is_new: condicao == "Novo",
			payment_methods: meiosPagamento,
		});
	}

	return (
		<Center>
			<IconButton
				onPress={() => defMostrarModal(true)}
				icon={<Icon as={Sliders} color="gray.700" />}
			/>
			<Modal isOpen={mostrarModal} onClose={() => defMostrarModal(false)}>
				<Modal.Content>
					<Modal.CloseButton />
					<Modal.Header color="gray.900">Filtrar anúncios</Modal.Header>
					<Modal.Body>
						<ScrollView>
							<VStack space={6}>
								<Box>
									<Heading fontSize="sm" color="gray.700" mb={3}>
										Condição
									</Heading>
									<HStack>
										<FiltroChip
											estaAtivo={condicao.toLowerCase() == "novo"}
											onPress={() => defCondicao(condicao.toLowerCase() == "novo" ? "" : "Novo")}
										>
											Novo
										</FiltroChip>
										<FiltroChip
											estaAtivo={condicao.toLowerCase() == "usado"}
											onPress={() => defCondicao(condicao.toLowerCase() == "usado" ? "" : "Usado")}
										>
											Usado
										</FiltroChip>
									</HStack>
								</Box>
								<Box>
									<Heading fontSize="sm" color="gray.700" mb={3}>
										Aceita troca?
									</Heading>
									<Switch
										onTrackColor="blue.300"
										mr="auto"
										value={aceitaTroca}
										onValueChange={defAceitaTroca}
									/>
								</Box>
								<Box>
									<Heading fontSize="sm" color="gray.700" mb={3}>
										Meios de pagamento aceitos
									</Heading>
									<Checkbox.Group onChange={defMeiosPagamento} value={meiosPagamento}>
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
								</Box>
							</VStack>
						</ScrollView>
					</Modal.Body>
					<Modal.Footer>
						<Button.Group space={2}>
							<Botao onPress={lidarResetarFiltros} bgColor="gray.300" _text={{ color: "gray.700" }}>
								Resetar filtros
							</Botao>
							<Botao
								onPress={() => {
									lidarAplicarFiltros();
									defMostrarModal(false);
								}}
							>
								Aplicar filtros
							</Botao>
						</Button.Group>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</Center>
	);
}
