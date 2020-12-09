//index da pasta models por motivos de padrão comum
const Note = require('./note.js')
const User = require('./user.js');

const models = {
    Note,
    User
}

module.exports = models;