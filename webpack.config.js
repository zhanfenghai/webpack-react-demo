var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 由于webpack.config.js文件是由node读取，node当前版本并不支持import
 */
// import path from 'path';
// import webpack from 'webpack';

var cwd = process.cwd();

var isProduction = function () {
  return process.env.NODE_ENV === 'production';
};

var plugins = [
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[hash:8].js'),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new htmlWebpackPlugin({     //打包文件使用md5解决版本缓存的问题时使用该插件去 替换html文件中引入文件的问题
    filename: 'index.html',//输出文件,此时的文件入径相对于output.path的位置
    template: './app/index.html',//html模板文件，会自动向模板插入打包后的文件
    hash: true
  }),
  new webpack.ProvidePlugin({   //此插件可以定义一个共用的入口，
    React:'react',       //比如 下面加的 React ,他会在每个文件自动require了react，所以你在文件中不需要 require(‘react’)，也可以使用 React。
    ReactRouter: 'react-router'
  }),
  new webpack.DefinePlugin({  //定义全局变量
			__DEV__: JSON.stringify(JSON.parse(!isProduction())),
	}),

];

if( isProduction() ) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      test: /(\.jsx|\.js)$/,
      compress: {
        warnings: false
      },
    })
  );
}

module.exports = {
  entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.js')],//入口文件
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.[hash:8].js',//打包后输出的文件
    chunkFilename: '[name]-[chunkhash:8].js',//异步加载文件生成的文件名，例如require.ensure异步加载的模块
    publicPath: isProduction()? 'http://******' : 'http://localhost:8080/',//设置打包之后的静态资源入径，会对html页面中引用的文件或者是css文件中的url路劲产生影响。生产环境用服务器地址或cdn地址（如需发cdn），开发环境用本地地址即可
  },
  devtool: 'eval',//开发模式
  module: {
        loaders: [
            {
                test: /\.js(x)*$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query:{
                  presets: [ 'react','es2015','stage-0']    //关于react使用es6的配置,最新版本的babel把es2015和react分开
                }
            },{
      				test: /\.(jpeg|jpg|png|gif)$/,
      				exclude: /node_modules/,
      				loader: 'url-loader?limit=10240&name=images/[name].[ext]?[hash:16]&context=' + path.resolve( cwd, 'assets/images' )//当资源大于1024k时，打包后会出现在name声明的文件夹，相对于output.path目录
      			},
            {
              test: /\.(scss|css)$/,
              loader: 'style!css!postcss!sass'
            }
        ]
    },
  resolve:{
    alias:{
      css:path.resolve(cwd,'assets') //配置入径，这样的话在其他文件下面就不需要写相当入径什么的了 方便文件的引用
    },
    extensions:['','.js','.jsx','.css','.scss']   //后缀为此类的文件在加载的时候可不用写文件名后缀
  },
  plugins: plugins
};
