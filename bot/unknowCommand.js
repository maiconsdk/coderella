const config = require('./config.json')

module.exports = async (client, message, args) => {
    message.reply(`o comando \`${args[0]}\` não existe, foi removido, ou está indisponível no momento.\nDigite \`${config.prefix}help\` para ver os comandos disponíveis.`)
}