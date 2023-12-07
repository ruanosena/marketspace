import { Button, IButtonProps } from "native-base";
import { ReactNode } from "react";

type Props = IButtonProps & { children?: ReactNode };

export function Botao({ children, ...rest }: Props) {
	return (
		<Button
			p={3}
			fontSize="sm"
			bgColor="gray.900"
			_text={{ color: "gray.50", fontWeight: "bold" }}
			{...rest}
		>
			{children}
		</Button>
	);
}
