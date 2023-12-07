import { extendTheme } from "native-base";

export const Tema = extendTheme({
	colors: {
		blue: {
			500: "#364D9D",
			300: "#647AC7",
		},
		lightBlue: {
			300: "#647AC71A",
		},
		red: {
			300: "#EE7979",
		},
		gray: {
			900: "#1A181B",
			700: "#3E3A40",
			600: "#5F5B62",
			500: "#9F9BA1",
			300: "#D9D8DA",
			100: "#EDECEE",
			50: "#F7F7F8",
		},
	},
	fonts: {
		heading: "Karla_700Bold",
		body: "Karla_400Regular",
	},
	fontSizes: {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 20,
		xl: 24,
	},
});
