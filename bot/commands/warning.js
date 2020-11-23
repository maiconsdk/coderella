const config = require('../config.json')

module.exports = async (client, message, args) => {
    const channel = await message.guild.channels.cache.find(channel => channel.id == config.channels['warning'])
    let warningMessage = message.content.split(' ')
    
    if(channel) {
        warningMessage.splice(0, 1)
        warningMessage = warningMessage.join(' ')

        await channel.send(`@everyone ${warningMessage}`)
        await message.channel.send(`**${message.author.username}**, seu aviso foi postado em ${channel} com sucesso!`)
    }
}