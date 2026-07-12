#!/usr/bin/env node

const arg = require('arg');
const chalk = require('chalk');

const getConfig = require('../src/commands/config-mgr.js');
const start = require('../src/commands/start.js');
try {
const args = arg({
  '--start': Boolean,
  '--build': Boolean,
});
//console.log(args);



  if (args['--start']) {
    const config = getConfig();

    console.log(config);
    


    start(config);

    console.log(chalk.bgCyanBright("starting the tool....."));
    
  }

}

catch(e) {
  console.log(chalk.red(e.message));
  usage();
}


/*
function PrintUsage(){
  console.log('${chalk.whiteBright('sonion, these are the options: [CMD]')} \n --start: starts the tool  \n --build: builds the tool(or sumn thing ig) ');
}
*/
function usage() {
  console.log(`${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('--start')}\tStarts the app
  ${chalk.greenBright('--build')}\tBuilds the app`);
}
