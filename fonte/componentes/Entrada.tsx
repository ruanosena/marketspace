import { FormControl, IInputProps, Input } from "native-base";

type Props = IInputProps & {
	erro?: string;
};

export function Entrada({ erro, ...rest }: Props) {
	const invalido = !!erro;

	return (
		<FormControl isInvalid={invalido}>
			<Input
				bgColor="gray.50"
				placeholderTextColor="gray.500"
				borderRadius="md"
				py={3}
				px={4}
				fontSize="md"
				borderWidth={0}
				isInvalid={invalido}
				_invalid={{ borderWidth: 1, borderColor: "red.300" }}
				_focus={{
					borderWidth: 1,
					borderColor: "gray.600",
				}}
				{...rest}
			/>
			<FormControl.ErrorMessage _text={{ color: "red.300" }}>{erro}</FormControl.ErrorMessage>
		</FormControl>
	);
}
