const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    AuthenticationError,
    ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();
const gravatar = require('../util/gravatar.js');
const mongoose = require('mongoose');


module.exports = {
    //query do apollo playground para criar:
    /*
    mutation {
        newNote (content: "This is a note in our database!") {
            content
            author
            id
        }
    }
    */

    newNote: async (parent, args, { models, user }) => {
        //lá atrás(context+jwt.sign fn) o user tem de bater certo ou !user recebe falsy value
        //se nao existe user no context -> auth error
        if (!user) {
            throw new AuthenticationError('é preciso estar signed up para criar note')
        }

        return await models.Note.create({
            content: args.content,
            //aceder ao author (author obj em note.js) passado para a db
            /**
             * author: {
                type: mongoose.Schema.Types.ObjectId,
                    ref:'User',
                    required: true
                }
             */
            author: mongoose.Types.ObjectId(user.id),
            favoriteCount:0
        });
    },

    deleteNote: async (parent, { id }, { models, user }) => {
        //se nao é user, erro
        if (!user) {
            throw new AuthenticationError('é preciso estar signed in para apagar nota');
        }
        //note.author (está na db, é string) user.id é o que foi passado
        const note = await models.Note.findById(id);
        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError('nao é permitido apagar a nota');
        }
        //se sucesso em cima
        try {
            // se sucesso remove nota
            await note.remove();
            return true;
          } catch (err) {
            // se erro devolve false
            return false;
          }

    },

    /**
     * mutation {
        updateNote(
            id: "5fb359fef619910cc828bae2",
            content: "Nota2: Criar nova nota para actualizar->Passar de 1 para 2(done)"
            ){
                id
                content
                author
                }
                }   
     */
    updateNote: async (parent, { content, id }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError('preciso estar logado para actualizar note');
        }
        //vai à bd pesquisa por id, compara com o user .id context que foi passado
        const note = await models.Note.findById(id);
        if (note && String(note.author) !== user.id) {
            throw new AuthenticationError('nao tens permissoes para actualizar note');
        }


        return await models.Note.findOneAndUpdate(
            //passamos 3 objs
            {
                _id: id
            },
            {
                $set: {
                    content
                }
            },
            {      //coisas do mongoose
                new: true //new: true, which instructs the database to return the updated note content to us.
            }
        )
    },

    /**
     * 
     * Conta feita:
mutation {
signUp(
username: "BeerfgrfBoop",
email: "rofdfgdbot@example.com",
password: "NotAdfdfRobot10010!"
)
}

token:
{
"Authorization": ""
}

    Irá devolve um token JWT
    */
    signUp: async (parent, { username, email, password }, { models }) => {
        //normalizar o email
        email = email.trim().toLowerCase();
        const saltRounds = 10;
        //hashing da password
        const hashed = await bcrypt.hash(password, saltRounds);
        //criar gravatar URL
        const avatar = gravatar(email);
        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            });

            //criar e devolver JWT
            return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        } catch (err) {
            console.log(err);
            //se houver problema a criar a conta mostrar erro:
            throw new Error('erro a criar a conta');
        }
    },
    signIn: async (parent, { username, email, password }, { models }) => {
        if (email) {
            email = email.trim().toLowerCase();
        }
        const user = await models.User.findOne({
            $or: [{ email }, { username }]
        });
        if (!user) {
            throw new AuthenticationError('Error user not found');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new AuthenticationError('Bad password')
        }
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    },


    //Exemplo:

    /**
     * 
     * 
mutation {
newNote(content: "Check check it out!") {
content
favoriteCount
id
}
}

+


mutation {
toggleFavorite(id: "<YOUR_NOTE_ID_HERE>") {
favoriteCount

}
}
     */
    toggleFavorite: async (parent, { id }, { models, user }) => {
        //se user nao passa, erro
        if (!user) {
            throw new AuthenticationError('é preciso estar logado');
        }
        //checkar se o user já favoritou a note
        let noteCheck = await models.Note.findById(id);
        const hasUser = noteCheck.favoritedBy.indexOf(user.id);

        //se está na lista (array), tira-lo de lá e reduzir favoriteCount -1
        //para sair é dar toggle de novo.
        if (hasUser >= 0) {
            return await models.Note.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        //tira user da lista
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        //decrementa
                        favoriteCount: -1
                    }
                },
                {
                    //actualiza
                    new: true
                }
            );
        } else {

            //se nao existe, add e +1 no favoriteCount
            return await models.Note.findByIdAndUpdate(
                id,
                {
                    $push: {
                        //insere
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        //add
                        favoriteCount: 1
                    }
                },
                {     //actualiza
                    new: true
                }
            );

        }
    },


}



/**
 *
 * BCRYPT
const bcrypt = require('bcrypt');
const saltRounds = 10;

const passwordEncrypt = (password) =>{
    //devolve uma promise<string>
    return bcrypt.hash(password,saltRounds);
}



//comparar, sendo a plainText vem do UI e hashedPassword vem hashed+salted da db
const checkPassword = (plainTextPassword,hashedPassword) =>{
    return bcrypt.compare(hashedPassword,plainTextPassword);
}
 */