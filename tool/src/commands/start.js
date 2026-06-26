const chalk = require('chalk');

module.export = function start(config) {
  console.log(chalk.green("starting..........."));
  console.log(chalk.green("got the config file!!"), config);
}
