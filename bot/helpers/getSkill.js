const Discord  = require('discord.js')
const Embed    = new Discord.MessageEmbed()

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
                                 .setFooter('Retirado do site oficial do EO: https://cutt.ly/6fhBFUb')
                                 .setAuthor(hero.name, hero.cover)
                        )
                    }
                })

            } else {
                message.channel.send(`**${message.author.username}**, parece que você digitou algo errado 😰! A sintaxe correta do comando é:\n\`!build [hero] [params]\`\n\n para mais dúvidas, confira a documentação digitando \`!help\``)
            }

        } else {
            message.channel.send(`**${message.author.username}**, parece que você digitou algo errado 😰! A sintaxe correta do comando é:\n\`!build [hero] [params]\`\n\n para mais dúvidas, confira a documentação digitando \`!help\``)
        }

    }).catch((error) => {
        message.channel.send(`**${message.author.username}**, parece que houve um erro interno 😰! Vamos verificar esse problema assim que possível. Se necessário, notifique um **administrador**.`)
    })
}