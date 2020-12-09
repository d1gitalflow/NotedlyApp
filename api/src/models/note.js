const mongoose = require('mongoose');

//Definir o schema de note
const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    favoriteCount:{
        type:Number,
        default: 0
    },
    favoritedBy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
},
    { //createdAt e updatedAt
        timestamps: true
    });
//definir o modelo de note com o schema 
const Note = mongoose.model('Note', noteSchema);


//exportar para index.js
module.exports = Note; //btw é uma classe logo tem-se de instanciar