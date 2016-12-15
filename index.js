const init    = require('./build/init.js');
const create  = require('./build/create.js');
const pkg     = require('./package.json');
const program = require('commander');

program
  .version(pkg.version);

program
  .command('init [project]')
  .description('init a new project')
  .action(function(project){
      init.run(project);
  });

 program.parse(process.argv);
