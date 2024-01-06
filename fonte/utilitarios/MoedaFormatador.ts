export const Formatador = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
});

export default function (valor: number) {
	let valorLocal = Formatador.format(valor / 100);
  return valorLocal.split(/\s/).pop();
}
