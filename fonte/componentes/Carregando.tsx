import { Center, Spinner } from "native-base";

export function Carregando() {
	return (
		<Center flex={1} bgColor="gray.100">
			<Spinner size="lg" color="blue.500" />
		</Center>
	);
}
