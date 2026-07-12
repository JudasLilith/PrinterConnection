const chalk = require('chalk');

module.exports = function start(config) {
  console.log("starting...........");
  console.log(chalk.green("got the config file!!"), config);
}
