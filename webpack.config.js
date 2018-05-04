var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './build');
var APP_DIR = path.resolve(__dirname, './src/client/SetupOrgUsersPage');

const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const config = {
   entry: {
	 main: APP_DIR + '/index.ts'
   },
   mode: "development",
   output: {
	 filename: 'bundle.js',
	 path: BUILD_DIR,
   },
   resolve: {
		// These are the reasonable defaults supported by the Node ecosystem.
		extensions: ['.js', '.json', '.ts', '.tsx'],
		plugins: [
			// For path resolution.
			// See https://www.npmjs.com/package/awesome-typescript-loader#advanced-path-resolution-in-typescript-20
			new TsConfigPathsPlugin({
				configFileName: './src/client/tsconfig.json'
			})
		]
	},
   module: {
	rules: [
	 {
	   test: /(\.css|.scss)$/,
	   use: [{
		   loader: "style-loader" // creates style nodes from JS strings
	   }, {
		   loader: "css-loader" // translates CSS into CommonJS
	   }, {
		   loader: "sass-loader" // compiles Sass to CSS
	   }]
	 },
	 {
	   test: /\.(jsx|js)?$/,
	   use: [{
		 loader: "babel-loader",
		 options: {
		   cacheDirectory: true,
		   presets: ['react', 'es2015'] // Transpiles JSX and ES6
		 }
	   }]
	 },
	 {
		oneOf: [
		  // "url" loader works just like "file" loader but it also embeds
		  // assets smaller than specified size as data URLs to avoid requests.
		  // {
			 //  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
			 //  loader: require.resolve('url-loader'),
			 //  options: {
				//   limit: 10000,
				//   name: 'static/media/[name].[ext]'
			 //  }
		  // },
		  // Process JS/TS with TypeScript
		  {
			  test: /\.(js|ts|tsx)$/,
			  loader: 'awesome-typescript-loader',
			  options: {
				  configFileName: './src/client/tsconfig.json',
				  silent: true,
				  useCache: true
			  }
		  }
	  ]
	}
	]
  }
};

module.exports = config;