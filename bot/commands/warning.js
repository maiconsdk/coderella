const config = require('../config.json')

module.exports = async (client, message, args) => {
    const channel = await message.guild.channels.cache.find(channel => channel.id == config.warning_channel)
    let warningMessage = message.content.split(' ')

    if(channel) {
        warningMessage.splice(0, 1)
        warningMessage = warningMessage.join(' ')

        await channel.send(`@everyone ${warningMessage}`)
        message.reply(`Seu aviso foi postado em ${channel} com sucesso!`)
    }
}