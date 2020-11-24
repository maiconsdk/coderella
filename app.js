const mongoose      = require('mongoose')
const Hero          = require('./models/Hero')
const Skill         = require('./models/Skill')
const Discord       = require('discord.js')
const client        = new Discord.Client();
const config        = require('./bot/config.json')
const commands      = require('./bot/reader')()
const unknowCommand = require('./bot/unknowCommand')
const hasPermission = require('./bot/hasPermission')

/**
 * Conectando no banco
 * de dados mongo.
 */
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/coderella', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Logado no banco [Coderella] com sucesso!')

}).catch((error) => {
    console.log(`Houve o seguinte erro: ${error}`)
})

// const newHero = {
//     name: 'hadenna',
//     cover: 'https://www.eomoba.com/pc/gw/20191205093943/img/yxtx/Hadenna_efe79e9.png',
//     color: '#AE2AE6',
//     skills: [
//         new Skill({
//             name: 'Golpe da Foice',
//             type: 'Passiva',
//             description: 'O espírito de Hadenna brande uma foice gigante, com 20% a mais de alcance de ataque do que outros Heróis Melee. Seu 3º ataque aplicará o efeito "Choque da Alma" em inimigos.',
//             image: 'https://www.eomoba.com/pc/gw/20191205093943/img/yxjn/00022/0_2c52a8c.png'
//         }),
//         new Skill({
//             name: 'Corte da Alma',
//             type: 'Skill',
//             description: 'Hadenna e seu espírito investem na direção selecionada, prendendo inimigos em seu caminho. Ao chegar em seu destino, ambos causam Dano Físico e jogam inimigos para trás, aplicando o efeito "Choque da Alma" em quem levar o golpe.',
//             image: 'https://www.eomoba.com/pc/gw/20191205093943/img/yxjn/00022/c1_1912012.png'
//         })
//     ]
// }

// new Hero(newHero).save().then(() => {
//     console.log('Hero cadastrado com sucesso!')
// }).catch((error) => {
//     console.log('Houve um erro: '+ error)
// })

/**
 * Caso o modo de desenvolvimento
 * esteja ativo.
 */
if(config.debug) {
    /**
     * printa todos os commandos e o seus
     * scripts correspondentes.
     */
    console.log('Comandos registrados')
    console.log(commands)
}

/**
 * Evento que é executado quando o
 * bot faz o primeiro login.
 */
client.on('ready', () => {
    console.log(`Logado com ${client.user.tag}`)
})

/**
 * Evento que é acionado quando alguém
 * envia uma mensagem.
 */
client.on('message', (message) => {
    if(!message.author.bot) {

        /**
         * Transformando a string informada pelo
         * usuário separando cada palavra em um 
         * valor de uma array, removendo o prefixo
         * da string.
         */
        const args = message.content.trim().slice(config.prefix.length).split(/ +/g)

        /**
         * Removendo e retornando o primeiro elemento
         * da array de argumentos, que corresponde ao
         * comando inicial.
         */
        const command = args.shift().toLowerCase()

        /**
         * Se o comando existir, ele
         * será executado.
         */
        if(commands[config.prefix + command]) {

            /**
             * Verifica se o usuário tem
             * permissão para executar o comando.
             */
            if(hasPermission(message.member, config.prefix + command)) {
                commands[config.prefix + command](client, message, args)
            
            } else {
                message.channel.send(`**${message.author.username}**, você não tem permissão para executar esse comando.`)
            }
        
        } else {
            let fullArgs = message.content.split(' ')

            /**
             * Verifica se o primeiro elemento
             * do array é o comando errado, e
             * encaminha para a função corresponde.
             */
            if(fullArgs[0] == (config.prefix + command)) {
                unknowCommand(client, message, fullArgs)
            }
        }
    }
})

/**
 * Inicialização de uma
 * instância de login para o bot.
 */
client.login(config.token)