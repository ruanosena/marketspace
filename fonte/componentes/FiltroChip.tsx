import { IPressableProps, Icon, Pressable, Text } from "native-base";
import { XCircle } from "phosphor-react-native";
import { ReactNode } from "react";

type Props = IPressableProps & {
	estaAtivo?: boolean;
	children?: ReactNode;
};

export function FiltroChip({ estaAtivo = false, children, ...rest }: Props) {
	return (
		<Pressable
			bgColor="gray.300"
			textTransform="uppercase"
			isPressed={estaAtivo}
			_pressed={{ bgColor: "blue.300" }}
			rounded="full"
			flexDir="row"
			py={1}
			pl={4}
			pr={estaAtivo ? 1 : 4}
      mr={1}
			{...rest}
		>
			<Text color={estaAtivo ? "white" : "gray.600"} textTransform="uppercase">
				{children}
			</Text>
			{estaAtivo && <Icon as={XCircle} color="gray.100" mx={1} />}
		</Pressable>
	);
}
