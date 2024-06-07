const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	plugins: [new MiniCssExtractPlugin()],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: false,
						},
					},
					'css-loader',
				],
			},
		],
	},
}
