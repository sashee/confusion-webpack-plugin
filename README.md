# Confusion Webpack Plugin

This plugin adds Webpack support to the [Confusion](https://github.com/uxebu/confusion) Javascript obfuscator.

## Usage

Add it as a devDependency to your package.json:

```
devDependencies: {
  ...
  "confusion-webpack-plugin": "https://github.com/sashee/confusion-webpack-plugin",
  ...
},
```

Then add it to the webpack config:

```
const ConfusionPlugin = require("confusion-webpack-plugin");

...
plugins: [
  ...
  new ConfusionPlugin({}),
  ...
]
...
```

For better results, you can include UglifyJs after Confusion. Please see the [example](https://github.com/sashee/confusion-webpack-plugin/blob/master/example/webpack.config.js).
