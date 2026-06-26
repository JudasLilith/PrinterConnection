#!/usr/bin/env node

const arg = require('arg');
const chalk = require('chalk');
const pkgUp = require('pkgUp');


try {


const args = arg({
  '--start': Boolean,
  '--build': Boolean,
});
console.log(args);



  if (args['--start']) {
    const pkgPath = pkgUp.sync({cwd: process.cwd()});

    const pkg = require('pkgPath');

    if (pkg.tool){
      console.log('found configuration, ', pkg.tool);
      // then do sumn with found configuration
    }

    else {
      console.log(chalk.yellow("sorry, I couldn't find anything, so using default now"));

    }


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
