  
const mongoose = require('mongoose');

const FavSchema = mongoose.Schema({
    filme: {
        type: String,
        required: false
    },
    realizador: {
        type: String,
        required: false
    },
    ator: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Favorito', FavSchema);