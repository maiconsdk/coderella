const Discord  = require('discord.js')
const Embed    = new Discord.MessageEmbed()
const dataBase = require('../../dataBase.json')

module.exports = (client, message, args) => {
    const heros = dataBase

    /**
     * Remove o primeiro item do array
     * e retorna o mesmo.
     */
    const hero = (args.length > 0)? args.shift().toLowerCase() : null

    /**
     * Faz a verificação para
     * caso o usuário não tenha especificado
     * um hero.
     */
    if(hero && heros[hero]) {
        if(heros[hero] && args.length == 0) {

            /**
             * Percorre todas as skills
             * retornando cada uma em uma
             * mensagem Embed.
             */
            heros[hero].skills.forEach((skill) => {
                message.channel.send(
                    Embed.setColor(heros[hero].color)
                         .setTitle(skill.name)
                         .setThumbnail(skill.image)
                         .setDescription(skill.description)
                         .setFooter('Retirado do site oficial do EO: https://cutt.ly/6fhBFUb')
                         .setAuthor(heros[hero].name, heros[hero].image)
                )
            })
        } else if(heros[hero] && args[0] == 'info') {
            message.channel.send('Placeholder de info do hero')

        } else if(args[0] > 0 && args[0] < heros[hero].skills.length + 1) {
    
            /**
             * Retorna apenas a skill
             * selecionada pelo usuário.
             */
            heros[hero].skills.forEach((skill, index) => {
                if(args[0] == index + 1) {
                    message.channel.send(
                        Embed.setColor(heros[hero].color)
                             .setTitle(skill.name)
                             .setThumbnail(skill.image)
                             .setDescription(skill.description)
                             .setFooter('Retirado do site oficial do EO: https://cutt.ly/6fhBFUb')
                             .setAuthor(heros[hero].name, heros[hero].image)
                    )
                        
                }
            })
        } else {
            message.channel.send(`**${message.author.username}**, parece que você digitou algo errado 😰! A sintaxe correta do comando é:\n\`!build [hero] opcional[params]\`\n\n para mais dúvidas, confira a documentação digitando \`!help\``)
        }
    
    } else {
        message.channel.send(`**${message.author.username}**, parece que você digitou algo errado 😰! A sintaxe correta do comando é:\n\`!build [hero] opcional[params]\`\n\n para mais dúvidas, confira a documentação digitando \`!help\``)
    }
}