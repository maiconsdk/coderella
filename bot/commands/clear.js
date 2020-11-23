module.exports = async (client, message, args) => {
    const channel = message.channel
    const messages = await channel.messages.fetch()

    /**
     * Realiza a deleção de todas as
     * mensagens do canal atual.
     */
    await channel.bulkDelete(messages)
}