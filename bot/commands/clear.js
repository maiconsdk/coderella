module.exports = async (client, message, args) => {
    const channel = message.channel
    const messages = await channel.messages.fetch()

    await channel.bulkDelete(messages)

    message.reply('Chat Limpo!')
}