const Discord  = require('discord.js')
const Embed    = new Discord.MessageEmbed()
const dataBase = require('../../dataBase.json')

module.exports = (client, message, args) => {
    const heros = dataBase

    /**
     * Remove o primeiro item do array
     * e retorna o mesmo.
     */
    const hero = args.shift().toLowerCase() 

    if(heros[hero] && args.length == 0 || args[0] == 'full') {

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
    } else {

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

            } else if(args[0] > index + 1 || args[0] <= 0) {
                message.channel.send(`**${message.author.username}**, as skills de ${heros[hero].name} vão de 1 à ${heros[hero].skills.length + 1}!`)
            }
        })
    }
}