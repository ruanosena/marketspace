import { TouchableHighlight, TouchableHighlightProps } from "react-native";
import { Box, HStack, Heading, Icon, Text, VStack } from "native-base";
import { Tag, ArrowRight } from "phosphor-react-native";
import { Botao } from "./Botao";

type Props = TouchableHighlightProps & {};

export function CTAAnuncios({ ...rest }: Props) {
	return (
		<TouchableHighlight {...rest}>
			<Box my={8} px={6}>
				<Text color="gray.600">Seus produtos anunciados para venda</Text>
				<HStack mt={3} py={3} px={4} alignItems="center" bgColor="lightBlue.300" borderRadius="md">
					<Icon as={Tag} color="blue.500" mr={4} />

					<VStack flex={1}>
						<Heading fontSize="lg" color="gray.700">
							4
						</Heading>
						<Text color="gray.700">anúncios ativos</Text>
					</VStack>

					<Botao
						variant="link"
						_text={{ color: "blue.500" }}
						rightIcon={<Icon as={ArrowRight} color="blue.500" />}
						bgColor="transparent"
					>
						Meus anúncios
					</Botao>
				</HStack>
			</Box>
		</TouchableHighlight>
	);
}
