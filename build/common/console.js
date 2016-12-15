'use strict';

var colors = require('colors');

var charMap = {
    g: [' #### ', '#    #', '######', '     #', '######'],

    a: ['      ', ' #### ', '#    #', ' ### #', '      '],

    d: ['     #', '     #', ' #####', '#    #', ' #####'],

    f: [' #####', '#     ', '######', '#     ', '#     '],

    l: ['#     ', '#     ', '#     ', '#     ', '######'],

    y: ['#    #', '#    #', ' #####', '     #', '######']
};
var arr = ['g', 'a', 'd', 'f', 'l', 'y'];
var name = '\n';

for (var i = 0; i < 5; i++) {
    for (var j = 0; j < arr.length; j++) {
        name += charMap[arr[j]][i] + '  ';
    }
    name += '\n';
}

console.log('%c' + name, 'color:green');

exports.pipeName = function () {
    var arr = ['g', 'a', 'd', 'f', 'l', 'y'];
    var name = '\n';

    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < arr.length; j++) {
            name += charMap[arr[j]][i] + '  ';
        }
        name += '\n';
    }

    console.log(name);
};