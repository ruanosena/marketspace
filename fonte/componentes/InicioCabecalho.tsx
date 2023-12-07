import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { Botao } from "./Botao";
import { Plus } from "phosphor-react-native";

import fotoPerfil from "@asset/fotoPerfil.png";

export function InicioCabecalho() {
	return (
		<HStack alignItems="center" px={6} pt={6}>
			<Image
				w={12}
				h={12}
				borderRadius="full"
				mr={2}
				borderWidth={2}
				borderColor="blue.300"
				source={fotoPerfil}
				alt="Imagem foto do perfil"
			/>
			<VStack flex={1}>
				<Text color="gray.900" fontSize="sm">
					Boas vindas,
				</Text>
				<Heading fontSize="sm">Maria!</Heading>
			</VStack>
			<Botao
				rounded="lg"
				_text={{ color: "gray.50", fontSize: "xs" }}
				leftIcon={<Icon as={Plus} color="gray.100" />}
			>
				Criar anúncio
			</Botao>
		</HStack>
	);
}
