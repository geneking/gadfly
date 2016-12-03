const init = require('init.js');
const create = require('create.js');

/**
 * [run core项目文件生成操作]
 * @param  {[String]} pname [bin命令执行目录]
 */
init.run = function(pname) {
  const output = process.cwd() + '/' + pname;
  const count = 0;
  console.log((pname+' 开始初始化......').red);
  console.log(('------------------------------------------------------------------------------------').green);
  ncp(root +'/core', output, function (err) {
    if (err) return console.log(err.red);
    travel(output);
    var timer = setTimeout(function(){
      if(count++) return;//不知道为什么ncp会调2次，加个判断
      console.log(('------------------------------------------------------------------------------------').green);
      console.log(('【' + pname + '】已构建 :)').red);
      clearTimeout(timer);
    }, 300);
  });
};
