#! /usr/bin/env node


import arg from 'arg';

import chalk from 'chalk';

import getConfig, { saveConfig } from '../src/commands/config-mgr.js';

import start from '../src/commands/start.js';

import logger from '../src/logger.cjs';

import { execSync } from 'child_process';

import * as readline from "node:readline/promises";

import blessed from 'blessed';

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

  console.log(chalk.bgCyanBright(chalk.black("starting the tool.....")));

  //console.log(args);
  const config = getConfig();




  if (args['--status'] || args['-s']) {
    console.log(chalk.blue("status"), "command picked");

    const checkTailscale = execSync('tailscale status --peers=false').toString();
    console.log(checkTailscale);
    if (checkTailscale === 'Command failed: tailscale status --peers=false') {
      console.log(chalk.red("tailscale is not on; turning on......"));
      execSync('tailscale up');
    }
    var screen = blessed.screen({
      smartCSR: true
    });

    screen.title = 'my window title';

    // Create a box perfectly centered horizontally and vertically.
    var box = blessed.box({
      top: 'center',
      left: 'center',
      width: '50%',
      height: '50%',
      content: 'Hello {bold}world{/bold}!',
      tags: true,
      border: {
        type: 'line'
      },
      style: {
        fg: 'white',
        bg: 'magenta',
        border: {
          fg: '#f0f0f0'
        },
        hover: {
          bg: 'green'
        }
      }
    });

    // Append our box to the screen.
    screen.append(box);



    // Quit on Escape, q, or Control-C.
    screen.key(['escape', 'q', 'C-c'], function (ch, key) {
      return process.exit(0);
    });

    // Focus our element.
    box.focus();

    // Render the screen.
    screen.render();

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
    saveConfig('append', `ip = ${answer}`);

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
