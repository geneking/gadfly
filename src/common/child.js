const merge = require('lodash.merge');
// 一个拥有promise风格的exec,返回{code, out}
module.exports = {
    exec: function (command, opt) {
        const options = merge({
            $through: true  // 是否将stdout, stderr打到控制台
        }, opt || {});
        return new Promise(function(resolve, reject) {
            const child = require('child_process').spawn('sh', ['-c', command], options);
            const {$through, $silent = true} = options;
            const cmd = {resolve, reject};
            let out = '';
            child.stdout.on('data', function (buf) {
                const string = String(buf);
                if ($through) process.stdout.write(string);
                out += string;
            });
            child.stderr.on('data', function (buf) {
                const string = String(buf);
                if ($through) process.stdout.write(string);
                out += string;
            });
            child.on('close', function (code) {
                const hasError = String(code) !== '0' && $silent !== true;
                cmd[hasError ? 'reject' : 'resolve']({code, out});
            });
        });
    }
};
