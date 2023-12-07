import { Button, Center, Icon, IconButton, Modal, Text } from "native-base";
import { Sliders } from "phosphor-react-native";
import { useState } from "react";

export function FiltrosModal() {
	const [mostrarModal, defMostrarModal] = useState(false);
	return (
		<Center>
			<IconButton
				onPress={() => defMostrarModal(true)}
				icon={<Icon as={Sliders} color="gray.700" />}
			/>
			<Modal isOpen={mostrarModal} onClose={() => defMostrarModal(false)}>
				<Modal.Content>
					<Modal.CloseButton />
					<Modal.Header>Filtrar anúncios</Modal.Header>
					<Modal.Body>
						<Text>Opa, aí sim</Text>
					</Modal.Body>
					<Modal.Footer>
						<Button.Group space={2}>
							<Button
								variant="ghost"
								colorScheme="blueGray"
								onPress={() => {
									defMostrarModal(false);
								}}
							>
								Cancel
							</Button>
							<Button
								onPress={() => {
									defMostrarModal(false);
								}}
							>
								Save
							</Button>
						</Button.Group>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</Center>
	);
}
