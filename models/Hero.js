const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const Hero = new Schema({
    name: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        required: true
    }
})

mongoose.model('heros', Hero)
module.exports = mongoose.model('heros')