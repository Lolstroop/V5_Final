const mongoose = require('mongoose');

const FilmSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Film', FilmSchema);