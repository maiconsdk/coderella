const Discord = require('discord.js')
const client  = new Discord.Client();
const botConfig  = require('./bot/config.json')
const commands = require('./bot/reader')(botConfig.prefix)

/**
 * printa todos os commandos e o seus
 * scripts correspondentes.
 */
console.log(commands)

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
         * valor de uma array.
         */
        const args = message.content.trim().slice(botConfig.prefix.length).split(/ +/g)

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
        if(commands[botConfig.prefix + command]) {
            commands[botConfig.prefix + command](client, message, args)   
        }
    }
})

/**
 * Inicialização de uma
 * instância de login para o bot.
 */
client.login(botConfig.token)