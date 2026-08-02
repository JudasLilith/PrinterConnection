import chalk from 'chalk';
import createLogger from '../logger.cjs';
const logger = createLogger('config:mgr');

import { cosmiconfigSync } from 'cosmiconfig';

import fs from "fs";

import path from "path";

import { fileURLToPath } from 'url';
import { config } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, '../../../config/PrinterConnection.conf');



export default function getConfig() {
  let config = fs.readFileSync(configPath, 'utf8', (err, data) => {
    if (err) {
      console.log(chalk.red('error reading:', err));
      return;
    }
    let lines = config.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

    }

    console.log(data);
  });

  console.log(config);





}

export function saveConfig(status, value) {
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

}
