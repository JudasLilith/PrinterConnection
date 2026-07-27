#!/usr/bin/env node


import arg from 'arg';

import chalk from 'chalk';

import getConfig from '../src/commands/config-mgr.js';

import start from '../src/commands/start.js';

import logger from '../src/logger.js';

import { execSync } from 'child_process';

import * as readline from "readline";


/*
import { ping } from '@network-utils/tcp-ping'
*/

async function ping() {

  const response = await fetch("http://100.103.238.60");
  console.log(response.status, response.ok, 'jackshit');


}

try {

  const args = arg({
    '--status': Boolean,
    '-s': Boolean,

    '--information': Boolean,
    '-i': Boolean,

    '--debug': Boolean,
    '-d': Boolean,

    '--init': Boolean,
    '-i': Boolean,
  });
  //console.log(args);
  const config = getConfig();

  console.log(config);



  start(config);

  console.log(chalk.bgCyanBright(chalk.black("starting the tool.....")));



  if (args['--status'] || args['-s']) {
    console.log(chalk.blue("status"), "command picked");

    const checkTailscale = execSync('tailscale status --peers=false').toString();
    console.log(checkTailscale);
    if (checkTailscale === 'Command failed: tailscale status --peers=false') {
      console.log(chalk.red("tailscale is not on; turning on......"));
      execSync('tailscale up');

    }
    console.log()
    ping();







  }

  if (args['--init'] || args['-i']) {
    console.log(chalk.yellow("setting up the profile......."));
    const ip = readline.createInterface(({
      input: process.stdin,
      output: process.stdout,
    }));

    r1.question("what is your Printer's IP address?: ", (answer) => {
      console.log(chalk.green('is ${ answer } what you wrote down?'));
      r1.close();
    })
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
