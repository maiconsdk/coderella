const config        = require('../config.json')
const commands      = require('../reader')()
const hasPermission = require('../hasPermission')

const description = {
    '!help': 'Retorna todos os comandos possíveis para o seu cargo atual.',
    '!warning': 'Permite criar um aviso no canal de avisos.',
    '!ping': 'Retorna o ping atual da aplicação.',
    '!clear': 'Limpa todas as mensagens do canal.'
}

module.exports = async (client, message, args) => {
    const author = message.author.username
    var content = `**${author}**, confira a lista de comandos:\n`

    /**
     * Recupera todas as keys do array.
     */
    Object.keys(commands).forEach((command) => {
        if(hasPermission(message.member, command)) {
            content += `\n ${command}: ${description[command] ? description[command] : 'Sem descrição'}`
        }
    })

    /**
     * Realiza o envio para a DM do
     * usuário, e depois o notifica
     * no canal respectivo.
     */
    await message.author.send(content)

    if(message.guild) {
        message.channel.send(`**${author}**, os comandos já foram enviados para sua DM!`)
    }
}