import React from 'react';
//import graphql e useQuery
import { useQuery } from '@apollo/client';

//REFRACTORED ABAIXO
/** const NotePage = props => {
    return (
        //ex: localhost:1234/note/666 http req, o print da página é 666
        <div>
            <p>ID: {props.match.params.id}</p>
        </div>
    );
};*/
//props recebe objecto inteiro, (não faz descontruturing como de costume)

//export default NotePage; //quando exportado este div vai 
//receber props(property) + match(property) dos imports(React Router),
//TL;DR 'match.params' vai aceder ao URL parameters

/** 'Match' This property contains information about how the route path matches
the URL. This will give us access to the URL parameters through match.params. */

//importar component Note.js
import Note from '../components/Note.js';

//import note query que aceita um ID
import { GET_NOTE } from '../gql/query';


//recebe do index.js  <Route path="/note/:id" component={Note} />
const NotePage = props => {
    //guarda id
    const id = props.match.params.id;

    //query hook que passa o id
    const { loading, error, data} = useQuery(GET_NOTE,{variables:{id}});
    
    //durante loading é true
    if(loading){
        return <p>A carregar...</p>
    }
    //se erro
    if(error){
        return <p>Erro(note.js): Nota nao encontrada </p>
    }
    //mostrar dados no UI
    return <Note note={data.note} />
}

export default NotePage;