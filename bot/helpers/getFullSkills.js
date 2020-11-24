const Discord  = require('discord.js')
const Embed    = new Discord.MessageEmbed()

module.exports = async (hero, term, message) => {
    const Hero = hero
    
    /**
     * Caso o Hero informado
     * seja encontrado, ele irá
     * listar as skills do mesmo.
     */
    Hero.findOne({name: term}).then((hero) => {
        
        if(hero) {
            /**
             * Percorre todas as skills
             * retornando cada uma em uma
             * mensagem Embed.
             */
            hero.skills.forEach((skill) => {
                message.channel.send(
                    Embed.setColor(hero.color)
                         .setTitle(skill.name)
                         .setThumbnail(skill.image)
                         .setDescription(skill.description)
                         .setFooter('Retirado do site oficial do EO: https://cutt.ly/6fhBFUb')
                         .setAuthor(hero.name, hero.cover)
                )
            })

        } else {
            message.channel.send(`**${message.author.username}**, parece que você digitou algo errado 😰! A sintaxe correta do comando é:\n\`!build [hero] opcional[params]\`\n\n para mais dúvidas, confira a documentação digitando \`!help\``)
        }

    }).catch((error) => {
        message.channel.send(`**${message.author.username}**, parece que houve um erro interno 😰! Vamos verificar esse problema assim que possível. Se necessário, notifique um **administrador**.`)
        console.log('Houve um erro ao buscar o hero: ' + error)
    })
}