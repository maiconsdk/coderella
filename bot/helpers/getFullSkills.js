const Discord  = require('discord.js')
const Embed    = new Discord.MessageEmbed()
const Message  = require('./messages/SkillNotFound')

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
            Message(message, Embed)
        }

    }).catch((error) => {
        Message(message, Embed, error)
    })
}