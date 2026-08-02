import chalk from 'chalk';
import createLogger from '../logger.cjs';
const logger = createLogger('config:mgr');

import { cosmiconfigSync } from 'cosmiconfig';

import fs from "fs";

import ini from 'ini';

import path from "path";

import { fileURLToPath } from 'url';
import { config } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, '../../../config/PrinterConnection.conf');



export default function getConfig() {
  let config = ini.parse(fs.readFileSync(configPath, 'utf8'));
  console.log(config.ip);
  return config;
}

export function saveConfig(status, value) {

  let config = ini.parse(fs.readFileSync(configPath, 'utf8'));
  console.log(chalk.red("WARNING! the previous crap on the config files will all be wiped!"));
  fs.writeFileSync(configPath, '');
  if (status === 'add') {
    config.ip = value;
    fs.writeFileSync(configPath, ini.stringify(config));
  }
  else if (status === 'append') {
    fs.appendFileSync(configPath, value);
  }

  else if (status === 'remove') {
    delete config.ip;
    fs.writeFileSync(configPath, ini.stringify(config));
  }


}
