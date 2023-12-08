import { ReactNode } from "react";
import { HStack, Heading, Icon, IconButton } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "phosphor-react-native";

type Props = {
	botaoVoltar?: boolean;
	children?: ReactNode;
	botaoDireita?: ReactNode;
};

export function TelaCabecalho({ botaoVoltar = true, children, botaoDireita }: Props) {
	const navegacao = useNavigation();

	function lidarVoltar() {
		navegacao.goBack();
	}

	return (
		<HStack alignItems="center" px={6} justifyContent="space-between">
			{botaoVoltar && (
				<IconButton onPress={lidarVoltar} icon={<Icon as={ArrowLeft} color="gray.900" />} />
			)}
			{children && <Heading flex={1} textAlign="center" fontSize="lg">{children}</Heading>}
			{botaoDireita}
		</HStack>
	);
}
