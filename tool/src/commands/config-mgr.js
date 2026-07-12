const chalk = require('chalk');
const logger = require('../logger.js')('config:mgr');
const {cosmiconfigSync } = require('cosmiconfig');
const configLoader = cosmiconfigSync('tool');



module.exports = function getConfig() { 
  const result = configLoader.search(process.cwd());
  console.log(process.cwd());
      if (!result){
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
