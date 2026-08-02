#! /usr/bin/env node


import arg from 'arg';

import chalk from 'chalk';

import getConfig, { saveConfig } from '../src/commands/config-mgr.js';

import start from '../src/commands/start.js';

import logger from '../src/logger.cjs';

import { execSync } from 'child_process';

import * as readline from "node:readline/promises";


/*
import { ping } from '@network-utils/tcp-ping'
*/

function ping(ip) {
  const response = fetch(ip);
  console.log(response.status, response.ok, 'jackshit');
}




async function getIP() {
  const r1 = readline.createInterface(({
    input: process.stdin,
    output: process.stdout,
  }));

  let answer = await r1.question("what is your Printer's IP address?: ");
  console.log(chalk.green(`you wrote: ${answer} `));
  r1.close();
  return answer;
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



  }

  if (args['--init'] || args['-i']) {
    console.log(chalk.yellow("setting up the profile......."));
    let answer;
    answer = await getIP();

    let ipcorrect = false;
    while (ipcorrect === false) {
      const ask = readline.createInterface(({
        input: process.stdin,
        output: process.stdout,
      }));
      let ipcorrect = await ask.question(`is ${answer} correct?(y/n): `);
      console.log(ipcorrect);
      if (ipcorrect.trim() === "y") {
        console.log(chalk.green("y was picked! proceeding........"));
        ask.close();
        break;
      }

      else if (ipcorrect === "n") {
        console.log(chalk.yellow(`
****:-+++----------++++++++++++-++--------- :   ******************************+-: :::---***%**++++*+
****-++++-------------+++++---+---+-------+++**+******************************:  :::------+++++-+**+
****++++--+------------+--+-+--------+++++-+++++*****************************-: :::-------------++++
*****++++------++---------------++++****++-+**%++***************************+::::---------------::-+
*****++++-----++++++-++-------+*++++*++++----+- +*************************** :-:---------------::-+*
******+++--++++++++++------+++++++****++++--- ++-**************************: :--------:::-------+***
*******-++++---+-+---+-++-++++++*-++++++------ +:**************************-+++------:::------++++++
********-------++----++-++++++++--+++++--------: ******************************+------:-------++++++
*******-+--+++-+-+--++++-------+++++++-+--------- *****************************-:------------+++++++
*******-++--++++--+--+++++++------------++-------+-****************************+-:---------+-+++++--
********-+--+++----+--++++++++++-------++++**+++--+****************************+-:---------+++++++--
*********++-+++*+--+++----+++---------++-+++++++-:+*****************************+-------++++++++++--
***********-++++-++++++-----+--------+++---++++++++******************************------++++++++++---
***********%%+----+++++++-+-+----++--+++++++++++*:*******************************-----+++++++++++---
*********%%%*%-+++++++++++-+++---+--++*++++++++++********************************---++++++++++++----
*******%%%%%%%-:--+++++++++++++++++-++++++++++++-%*%%%%****+**********************++++++++++++++----
*****%%%%%%%%%*:--+++++++++++++++++++++++-+++++++*%%*%%%%****************************++++++++++++---
%%%%%%%%%%%%%%%+++++++++++*++++++++++-------+++++*%%%%%%%%%%%%*******************************++-----
%%%%%*%%%%%%%%%%+--+++++++++++++++++++------+++++%%%%%%%%%%%%%%%%*****************************++----
*%%%%%%%%%%%%%%%%+-+++++++++++++++++++++++-++++*%%%%%%%%%%%%%%%%%%%%****************************+---
%%%%%%%%%%%%%%%%%*+-+++++++++++++++++++++++%%%%%%%%%%%%%%%%%%%%%%%%%%%************************%**+--
%%%%%%%%%%%%%%%%%%*+-++++++++++++++++++%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%***************************-- 
`));
        console.log(chalk.yellow("try again, Neiman"));
        ask.close();
        answer = await getIP();
      }

      else {
        ask.close();
        console.log(chalk.red("wrong input!"));
      }
    }
    saveConfig('remove', `ip = ${answer}`);
    getConfig();





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
