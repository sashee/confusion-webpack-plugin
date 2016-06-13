"use strict";
const parse = require('esprima').parse;
const toString = require('escodegen').generate;
const confusion = require('confusion');
const RawSource = require("webpack-sources").RawSource;
const ModuleFilenameHelpers = require("webpack/lib/ModuleFilenameHelpers.js");

function ConfusionPlugin(options) {
	this.options = options;
}

ConfusionPlugin.prototype.apply = function(compiler) {
	const options = this.options;
	options.test = options.test || /\.js($|\?)/i;

	compiler.plugin("compilation", (compilation) => {
		compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
			var files = [];
			chunks.forEach(function(chunk) {
				chunk.files.forEach(function(file) {
					files.push(file);
				});
			});
			compilation.additionalChunkAssets.forEach(function(file) {
				files.push(file);
			});
			files = files.filter(ModuleFilenameHelpers.matchObject.bind(undefined, options));

			for (let basename of files) {
				const asset = compilation.assets[basename];
				const ast = parse(asset.source());
				const obfuscated = confusion.transformAst(ast, confusion.createVariableName);
				const transformed = toString(obfuscated);

				compilation.assets[basename] = new RawSource(transformed);
			}
			callback();
		});
	});
};

module.exports = ConfusionPlugin;
