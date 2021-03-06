const config = require('./config.json')
const permissions = config.permissions

module.exports = (member, command) => {
    var verification = !permissions[command]

    if(!verification) {
        let perms = permissions[command]

        /**
         * Percorre todas as permissões
         * e verifica se o usuário possui
         * a permissão necessária.
         */
        perms.forEach((permission) => {
            switch(permission.type) {
                case 'role':
                    if(member.roles.cache.has(permission.value)) verification = true
                break;
                case 'permission':
                    if(member.permissions.has(permission.value)) verification = true
                break;
            }
        })
    }

    return verification
}