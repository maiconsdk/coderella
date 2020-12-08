const Discord  = require('discord.js')
const Embed    = new Discord.MessageEmbed()
const Message  = require('./messages/SkillNotFound')

module.exports = (hero, term, args, message) => {
    const Hero = hero
    
    /**
     * Caso o Hero informado
     * seja encontrado, ele irá
     * listar as skills do mesmo.
     */
    Hero.findOne({name: term}).then((hero) => {

        if(hero) {
            
            /**
             * Se o número da skill for maior que zero
             * e menor que a quantidade total de skills,
             * a skill selecionada é buscada.
             */
            if(args[0] > 0 && args[0] < hero.skills.length + 1) {

                /**
                 * Percorre todas as skills
                 * retornando a skill requisitada
                 * pelo usuário em uma mensagem Embed.
                 */
                hero.skills.forEach((skill, index) => {
                    if(args[0] == index + 1) {
                        message.channel.send(
                            Embed.setColor(hero.color)
                                 .setTitle(skill.name)
                                 .setThumbnail(skill.image)
                                 .setDescription(skill.description)
                                 .setImage('https://media.giphy.com/media/ltMeTbCQFeD4Fk8MuH/giphy.gif')
                                 .setAuthor(hero.name, hero.cover)
                        )
                    }
                })

            } else {
                Message(message, Embed)
            }

        } else {
            Message(message, Embed)
        }

    }).catch((error) => {
        Message(message, Embed)
    })
}