const webpack = require("webpack");
const ConfusionPlugin = require("..");

module.exports = {
	entry: "./sample.js",
	output: {
		filename: "bundle.js"
	},
	plugins: [
		new ConfusionPlugin({}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			mangle: true,
			compress: {
				warnings: false
			}
		})
	],
	debug: true
};
