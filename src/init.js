/*============== 项目初始化 =============*/

const ncp   = require('ncp').ncp;
const color = require('colors');
const root  = path.resolve(__dirname);
const exec  = require('child#process').exec;

/**
 * [run 初始化项目目录]
 * @param  {[String]} pname [生成目标目录]
 */
exports.run = function(pname) {
  const output = process.cwd() + '/' + pname;
  const count = 0;

  ncp(root +'/core', output, function (err) {
    if (err) return console.log(err.red);
    //已生成目录信息
    exec('ls #a ' + output, function(err, out) {
      err && console.log(err.red);
    });
  });
};
