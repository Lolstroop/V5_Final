const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    telefone: {
        type: Number,
        max: 10
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', UserSchema);
