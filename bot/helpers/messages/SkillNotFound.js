module.exports = (message, Embed, error = null) => {
    message.channel.send(
        Embed.setColor('#FFCC00')
             .setDescription(`**${message.author.username}**, parece que você digitou algo errado 😰! A sintaxe correta do comando é:\n\`!consult [hero] [opcional-params]\`\n\n para mais dúvidas, confira a documentação digitando \`!help\``)
    )

    console.log(error)
}