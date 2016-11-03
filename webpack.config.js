var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'source-map',
	entry: {
		mobile: ['./example/index']
	},
	output: {
		path: path.join(__dirname, './example/dist'),
		filename: 'bundle.js',
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
	],
	module: {
		loaders: [{
			test: /\.jsx$|\.js$/,
			exclude: /node_modules/,
			loader: "babel"
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	}
};
