const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;
const HappyPack = require('happypack');
const merge = require('webpack-merge');
const webpack = require('webpack');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
const MODULE_PATH = path.resolve(ROOT_PATH, 'app/module');

/**
 * [getDist 获取app.json中js分发路径]
 * @param  {[type]} src [description]
 * @return {[type]}     [description]
 */
const getDist = (src) => {
  const s1 = src.split("./app/page/")[1];
  const s2 = s1.substr(0, s1.lastIndexOf("/"));
  return s2;
};

/**
 * [getHtmlPluginArr 页面映射文件]
 * @return {[type]} [description]
 */
const getHtmlPluginArr = () => {
  let data = JSON.parse(fs.readFileSync('app.json', 'utf-8'));
  let pageList = data.pageList;
  let resultObj = {
    "pluginArr": [],
    "entryObj": {
      "common/common": MODULE_PATH + "/common/common.js"
    }
  };

  pageList.map((item, index) => {
    resultObj.entryObj[getDist(item.src)] = item.src;
    resultObj.pluginArr.push(
      new HtmlwebpackPlugin({
        chunks: ["common/common", getDist(item.src)], //当前页面js
        title: item.title,
        template: "app/" + "template.ejs",
        filename: getDist(item.src) + '.html',
        chunksSortMode: "dependency"
      })
    );
    //HappyPack, loader多进程去处理文件
    resultObj.pluginArr.push(
      new HappyPack({id: 'html'}),
      new HappyPack({id: 'css'}),
      new HappyPack({id: 'js'}),
      new HappyPack({id: 'tpl'})
    );
  });
  return resultObj;
};

const appJsonObj = getHtmlPluginArr();
const commonConfig = {
    entry: appJsonObj.entryObj,
    module: {
      preLoaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'eslint-loader',
          include: APP_PATH,
          exclude: MODULE_PATH
        }
      ],
      loaders: [
        {test: /\.html$/, loader: "html?minimize=false" },
        {test: /\.json$/, loader: "json" },
        {test: /\.scss|\.css$/, loaders: ["style", "css", "sass"] },
        {test: /\.(?:jpg|gif|png)$/, loader: 'url?limit=10240&name=../images/[name]-[hash:10].[ext]' },
        {test: /\.handlebars/, loader: "handlebars" },
        {
          test: /\.js$|\.jsx$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['es2015','react'],
            plugins: ['transform-class-properties']
          }
        },
      ]
    },
  output: {
    path: BUILD_PATH,
    filename: "js/[name].js"
  },
  externals: {
    "jquery": "jQuery"
  },
  resolve: {
    alias: {
      module: path.resolve(APP_PATH, 'module'),
      component: path.resolve(APP_PATH, "component"),
      page: path.resolve(APP_PATH, "page"),
      node_modules: path.resolve(ROOT_PATH, 'node_modules')
    },
    extensions: ['', '.js', '.jsx', '.json', '.scss']
  },
  plugins: appJsonObj.pluginArr,
  devtool: "source-map",
  cache: true
};

//删除build目录
exec('rm -rf build', function(err, out) {
  console.log(out); err && console.log(err);
});
//删除image目录
exec('rm -rf images', function(err, out) {
  console.log(out); err && console.log(err);
});

module.exports = merge(commonConfig, {
  output: {
    publicPath: '//s3.meituan.net/v1/mss_c4375b35f5cb4e678b5b55a48c40cf9d/' + data.cdn.bucketName,
    path: BUILD_PATH,
    filename: "js/[name]-[chunkhash:10].js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),
    new WebpackMd5Hash()
  ]
});
