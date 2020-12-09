module.exports = {
    notes: async (parent, args,{ models }) => { //'notes' é o nome da query
        return await models.Note.find().limit(100); //limit vem do mongodb
    },
    note: async (parent, args,{ models }) => {  //'notes' é o nome da query
        return await models.Note.findById(args.id);
    },
    user: async (parent,args,{models}) => {
        return await models.User.findOne({username: args.username}); //info sobre user
    },
    users: async (parent,args,{models}) => {
        return await models.User.find({}).limit(100); //lista de users
    },
                //esta query tem-se de passar um JWT
    me: async (parent,args,{models,user}) =>{
        return await models.User.findById(user.id); //acede ao user actual passado pelo context
    },

    /**
     * Logica do noteFeed query:
     * Se tivermos uma lista de 25 objectos (com ID's correspondentes de 1-25),
     * quando fizermos o pedido incial ele vai mostrar 1-10 sendo cursor no elemento 10,
     * e o hasNextPage em true. Fazemos outro pedido passando como argumento o cursor do elemento 10
     * (nota nº10), recebemos os items 11-20, e cursor é lhe passado o ID do 20 com hasNextPage true,
     * Finalmente o terceiro pedido devolve 21-25, ID cursor é lhe passado o 25,e o hasNextPage é false
     */
    noteFeed: async (parent,{cursor},{models}) => {
        //meter limite 
        const limit = 10;
        //set default next para false
        let hasNextPage = false;
        //se o cursor nao passa o default query fica vazio
        let cursorQuery = {}

        //se existe cursor
        //a query irá procurar notes com ObjectId < do que o cursor
        if(cursor){
            cursorQuery = { _id: { $lt: cursor } };
        }

        //procura o limite +1 of notes na db, e faz sort do mais recente para o mais velho
        let notes = await models.Note.find(cursorQuery)
        .sort({_id:-1})
        .limit(limit + 1);

        //se o numero de notes que procuramos excede o limite
        //set hasNextPage para true e trim notes para o limit
        if(notes.length > limit){
            hasNextPage = true;
            notes = notes.slice(0,-1);
        }
        //o novo cursor vai ser mongo object id do last item no feed array
        const newCursor = notes[notes.length - 1]._id;

        //devolve um obj com o 'notes', resultado do 'cursor' e o hasNextPage.
        return {
            notes,
            cursor: newCursor,
            hasNextPage
        }
    }
}