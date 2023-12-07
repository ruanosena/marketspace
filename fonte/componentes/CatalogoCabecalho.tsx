import { Box, HStack, Icon, IconButton, Text, VStack } from "native-base";
import { Entrada } from "./Entrada";
import { MagnifyingGlass, Sliders } from "phosphor-react-native";

export function CatalogoCabecalho() {
	return (
		<VStack px={6} space={3}>
			<Text color="gray.600">Compre produtos variados</Text>
			<Entrada
				placeholder="Buscar anúncio"
				InputRightElement={
					<HStack
						alignItems="center"
						space={1}
						divider={<Box height={5} borderWidth={1} borderRightColor="gray.500" />}
					>
						<IconButton icon={<Icon as={MagnifyingGlass} color="gray.700" />} />
						<IconButton icon={<Icon as={Sliders} color="gray.700" />} />
					</HStack>
				}
			/>
		</VStack>
	);
}
