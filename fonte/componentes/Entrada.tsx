import { IInputProps, Input } from "native-base";

type Props = IInputProps & {};

export function Entrada({ ...rest }: Props) {
	return (
		<Input
			bgColor="gray.50"
			placeholderTextColor="gray.500"
			borderRadius="md"
			py={3}
			px={4}
			fontSize="md"
			borderWidth={0}
			{...rest}
		/>
	);
}
