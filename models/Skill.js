const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const Skill = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }   
})

mongoose.model('skills', Skill)
module.exports = mongoose.model('skills')