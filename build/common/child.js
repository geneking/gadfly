'use strict';

var merge = require('lodash.merge');
// 一个拥有promise风格的exec,返回{code, out}
module.exports = {
    exec: function exec(command, opt) {
        var options = merge({
            $through: true // 是否将stdout, stderr打到控制台
        }, opt || {});
        return new Promise(function (resolve, reject) {
            var child = require('child_process').spawn('sh', ['-c', command], options);
            var $through = options.$through,
                _options$$silent = options.$silent,
                $silent = _options$$silent === undefined ? true : _options$$silent;

            var cmd = { resolve: resolve, reject: reject };
            var out = '';
            child.stdout.on('data', function (buf) {
                var string = String(buf);
                if ($through) process.stdout.write(string);
                out += string;
            });
            child.stderr.on('data', function (buf) {
                var string = String(buf);
                if ($through) process.stdout.write(string);
                out += string;
            });
            child.on('close', function (code) {
                var hasError = String(code) !== '0' && $silent !== true;
                cmd[hasError ? 'reject' : 'resolve']({ code: code, out: out });
            });
        });
    }
};