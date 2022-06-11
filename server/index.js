/**
 * Build the server.
 */

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: './server/server.js',
	target: 'node',
	externals: [nodeExternals()],
	plugins: [new MiniCssExtractPlugin()],
	output: {
		path: path.resolve('server-build'),
		filename: 'index.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
		]
	}
};