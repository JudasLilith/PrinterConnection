#!/usr/bin/env node

const arg = require('arg');
const chalk = require('chalk');

const getConfig = require('../src/commands/config-mgr.js');
const start = require('../src/commands/start.js');

const logger = require('../src/logger.js');

const { execSync } = require('child_process');

try {

  const args = arg({
    '--status': Boolean,
    '-s': Boolean,

    '--information': Boolean,
    '-i': Boolean,

    '--debug': Boolean,
    '-d': Boolean,
  });
  //console.log(args);
  const config = getConfig();

  console.log(config);



  start(config);

  console.log(chalk.bgCyanBright("starting the tool....."));



  if (args['--status'] || args['-s']) {
    console.log("status command picked");

    const checkTailscale = execSync('tailscale status --peers=false').toString();
    console.log(checkTailscale);
    if (checkTailscale === 'Command failed: tailscale status --peers=false') {
      console.log(chalk.red("tailscale is not on; turning on......"));
      execSync('tailscale up');
    }

    console.log()






  }

}

catch (e) {
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
