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
  console.log(config.ip)
  fs.writeFileSync(configPath, ini.stringify(config));
}

export function saveConfig(status, value) {
  let config = ini.parse(fs.readFileSync(configPath, 'utf8'));

  if (status === 'add') {
    fs.writeFileSync(configPath, value);
  }
  else if (status === 'append') {
    fs.appendFileSync(configPath, value);
  }

  else if (status === 'remove') {
    fs.writeFileSync(configPath, value);
    console.log(configPath, typeof configPath);
  }


  fs.writeFileSync(configPath, ini.stringify(config));


}
