'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*============== 项目初始化 =============*/
require('babel-polyfill');
var path = require('path');
var color = require('colors');
var child = require('./common/child');
var root = path.resolve(__dirname).replace('/build', '');

/**
 * [run 初始化项目目录]
 * @param  {[String]} pname [生成目标目录]
 */
exports.run = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(pname) {
        var base, output;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        base = process.cwd();
                        output = base + '/' + pname;
                        _context.next = 4;
                        return child.exec('mkdir ' + output);

                    case 4:
                        _context.next = 6;
                        return child.exec('cp -rf ' + root + '/core/* ' + output);

                    case 6:

                        //已生成目录信息
                        console.log(('\u3010' + pname + '\uFF1A\u521D\u59CB\u5316\u5B8C\u6210\u3011').green);
                        console.log(('\u3010\u9879\u76EE\u8DEF\u5F84\uFF1A' + output + '\u3011').green);

                        //安装npm包
                        console.log('【正在安装依赖npm包...】'.green);
                        _context.next = 11;
                        return child.exec('npm install -g vane');

                    case 11:
                        _context.next = 13;
                        return child.exec('npm install --prefix ' + output);

                    case 13:
                        _context.next = 15;
                        return child.exec('rm -rf ' + output + '/etc');

                    case 15:
                        _context.next = 17;
                        return child.exec('rm -rf ' + output + '/build');

                    case 17:

                        //启动应用
                        console.log('【正在启动应用...】'.green);
                        _context.next = 20;
                        return child.exec('npm start --prefix ' + output);

                    case 20:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}();