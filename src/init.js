/*============== 项目初始化 =============*/
require('babel-polyfill');
const path  = require('path');
const color = require('colors');
const child = require('./common/child');
const root  = path.resolve(__dirname).replace('/build', '');

/**
 * [run 初始化项目目录]
 * @param  {[String]} pname [生成目标目录]
 */
exports.run = async function (pname) {
    const base = process.cwd();
    const output = base + '/' +pname;

    await child.exec(`mkdir ${output}`);
    await child.exec(`cp -rf ${root}/core/* ${output}`);

    //已生成目录信息
    console.log(`【${pname}：初始化完成】`.green);
    console.log(`【项目路径：${output}】`.green);

    //安装npm包
    console.log('【正在安装依赖...】'.green);
    await child.exec(`npm install -g vane`);
    await child.exec(`npm install --prefix ` + output);

    //删除无效目录
    await child.exec(`rm -rf ${output}/etc`);
    await child.exec(`rm -rf ${output}/build`);

    //启动应用
    console.log('【正在启动应用...】'.green);
    await child.exec(`npm start --prefix ` + output);
};
