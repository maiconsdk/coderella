const Hero          = require('../../models/Hero')
const getFullSkills = require('../helpers/getFullSkills')
const getSkill      = require('../helpers/getSkill')

module.exports = (client, message, args) => {
    /**
     * Remove o primeiro item do array
     * e retorna o mesmo.
     */
    const term = (args.length > 0)? args.shift().toLowerCase() : null
    
    /**
     * Lista todas as skills
     * do Hero selecionado
     */
    if(args.length == 0) {
        getFullSkills(Hero, term, message)
    }

    /**
     * Caso o usuário informe um parâmetro
     * adicional, a seguinte função é executada.
     */
    if(args.length > 0) {
        getSkill(Hero, term, args, message)
    }
}