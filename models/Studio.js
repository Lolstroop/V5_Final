const mongoose = require('mongoose');

const StudioSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    morada: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true 
    }
});


module.exports = mongoose.model('Studios', StudioSchema);
