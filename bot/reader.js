const fs = require('fs')
const botConfig  = require('./config.json')

module.exports = (dirName = 'bot/commands/') => {

    const commands = {}

    /**
     * Coleta todos scripts de comandos
     * presentes na dirName.
     */
    const scripts = fs.readdirSync(dirName) 

    /**
     * Percorre o array de scripts,
     * para poder definir o require"
     * de cada um.
     */
    scripts.forEach((script) => {

        /**
         * Cria um array com todos os comandos
         * e o seus respectivos scripts.
         */
        commands[botConfig.prefix + script.split('.')[0]] = require(`../${dirName}${script}`)
    })

    return commands
}