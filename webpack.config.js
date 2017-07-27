const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
	entry: {
		index:'./src/js/index.js',
		homepage:'./src/js/homepage.js',
		material:'./src/js/material.js',
		user:'./src/js/user.js',
		quality:'./src/js/quality.js',
		customer:'./src/js/customer.js',
		order:'./src/js/order.js',
		work:'./src/js/work.js',
		warehouse:'./src/js/warehouse.js',
		workorder:'./src/js/workorder.js',
		vendor: ['element-ui']
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
				}
			}
		}, {
			test: /\.vue$/,
			exclude: /node_modules/,
			use: [{
				loader: "vue-loader",
				options: {
	                // vue-loader options go here
	                postcss: [require('autoprefixer')({ browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'] })]
	            }
			}]
		}, {
			test: /\.json$/,
			use: [{
				loader: "json-loader"
			}]
		}, {
			test: /\.css$/,
			use: [{
				loader: "style-loader"
			}, {
				loader: "css-loader"
			}]
		}, {
			test: /\.less$/,
			use: [{
				loader: "style-loader" // creates style nodes from JS strings 
			}, {
				loader: "css-loader"
			}, {
				loader: "less-loader" // compiles Less to CSS 
			}]
		}, {
			test: /\.(png|jpg|gif|woff|svg|eot|ttf)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: 'img/[name].[ext]'
				}
			}]
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false,
		        drop_console: true
		    }
		}),
		new CommonsChunkPlugin({
		  name: "vendor",
		
		  // filename: "vendor.js"
		  // (Give the chunk a different name)
		  minChunks: Infinity,
		  // (with more entries, this ensures that no other module
		  //  goes into the vendor chunk)
		}),
		new HtmlWebpackPlugin({
			title: 'index',
			filename: 'index.html',
			template: 'src/index.html',
			chunks: ['index','vendor']
		}),
		new HtmlWebpackPlugin({
			title: 'homepage',
			filename: 'homepage.html',
			template: 'src/homepage.html',
			chunks: ['homepage','vendor']
		}),
		new HtmlWebpackPlugin({
			title: 'material',
			filename: 'material.html',
			template: 'src/material.html',
			chunks: ['material','vendor']
		}),
		new HtmlWebpackPlugin({
			title: 'user',
			filename: 'user.html',
			template: 'src/user.html',
			chunks: ['user','vendor']
		}),
		new HtmlWebpackPlugin({
			title: 'quality',
			filename: 'quality.html',
			template: 'src/quality.html',
			chunks: ['quality','vendor']
		}),
		new HtmlWebpackPlugin({
			title: 'customer',
			filename: 'customer.html',
			template: 'src/customer.html',
			chunks: ['customer','vendor']
		}),
		new HtmlWebpackPlugin({
			title: 'order',
			filename: 'order.html',
			template: 'src/order.html',
			chunks: ['order','vendor']
		}),
		new HtmlWebpackPlugin({
			title: 'work',
			filename: 'work.html',
			template: 'src/work.html',
			chunks: ['work','vendor']
		}),
		new HtmlWebpackPlugin({
			title: 'warehouse',
			filename: 'warehouse.html',
			template: 'src/warehouse.html',
			chunks: ['warehouse','vendor']
		}),
		new HtmlWebpackPlugin({
			title: 'workorder',
			filename: 'workorder.html',
			template: 'src/workorder.html',
			chunks: ['workorder','vendor']
		})
		
	]
};