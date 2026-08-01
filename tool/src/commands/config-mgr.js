import chalk from 'chalk';
import createLogger from '../logger.cjs';
const logger = createLogger('config:mgr');

import { cosmiconfigSync } from 'cosmiconfig';

import fs from "fs";


const configLoader = cosmiconfigSync('tool');



export default function getConfig() {
  const result = configLoader.search(process.cwd());
  console.log(process.cwd());
  if (!result) {
    logger.warning("man this bullshit, where's the config sonion");
    return { port: 1234 };


    // then do sumn with found configuration
  }

  else {
    logger.debug("alrighty the config\'s hereeeeeeeee");
    console.log(chalk.green("alrighty I found the config"), result.config);
    return result.config;
  }



}

export function saveConfig(status, value) {
  fs.existsSync('../config/PrinterConnection.conf');
  if (status === 'add') {
    fs.writeFileSync(`../config/PrinterConnection.conf`, value);
  }

  else if (status === 'remove') {
    fs.writeFileSync(`../config/PrinterConnection.conf`, value);
  }

}
