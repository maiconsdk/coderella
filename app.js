const Discord       = require('discord.js')
const client        = new Discord.Client();
const config        = require('./bot/config.json')
const commands      = require('./bot/reader')()
const unknowCommand = require('./bot/unknowCommand')

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
            commands[config.prefix + command](client, message, args)   
        
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