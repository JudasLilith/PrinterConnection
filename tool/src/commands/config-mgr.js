const chalk = require('chalk');
const {cosmiconfigSync } = require('cosmiconfig');
const configLoader = cosmiconfigSync('tool');



module.exports = function getConfig() { 
  const result = configLoader.search(process.cwd());

      if (!result){
        console.log(chalk.yellow('couldn\'t find config, using default'));
        return { port: 1234 };
        // then do sumn with found configuration
      }

      else {
        console.log(chalk.green("alrighty I found the config"), result.config);
        return result.config;
      }

}
