module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					root: ["./fonte"],
					alias: {
						"@dto": "./fonte/dtos",
						"@asset": "./fonte/assets",
						"@comp": "./fonte/componentes",
						"@tela": "./fonte/telas",
						"@arm": "./fonte/armazenamento",
						"@util": "./fonte/utilitarios",
						"@servico": "./fonte/servicos",
						"@hook": "./fonte/hooks",
						"@ctx": "./fonte/contextos",
						"@rota": "./fonte/rotas",
					},
				},
			],
			"react-native-reanimated/plugin",
		],
	};
};
