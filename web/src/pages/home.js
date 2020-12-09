import React from 'react';
import Button from '../components/Button.js';

//importar useQuery + gql syntax
import { useQuery } from '@apollo/client';



//importar NoteFeed component
import NoteFeed from '../components/NoteFeed.js'

//a query guardada como variavel, que faz display dos dados aqui em home.js
import { GET_NOTES } from '../gql/query';
//depois tem-se de integrar a query no react (useQuery hook é do @apollo/client)

const Home = () => {
    //deconstructing de:
    /**
     * data - dados devolvidos sea query tiver sucesso
     * loading - loading state é true enquanto os dados estao a ser fetched, "loading screen"
     * error - devolve erro se falhar fetch
     * EXPLICAÇÃO EM BAIXO: DO HOME.JS
     */
    const {data, loading, error, fetchMore} = useQuery(GET_NOTES);
    //enquanto true, mostrar loading...
    if(loading){
        return <p>A carregar...</p>
    }
    //se erro... (*deve* devolver falsy value)
    if(error){
        return <p>Erro (home.js)!</p>
    }
    //se sucesso (foi refractored)
//    return (
//      <div>
//          {/** notes é um array */}
//          {data.noteFeed.notes.map((note) =>{
//            {/**devolve diferentes articles com a seguinte informação*/}
//            return <article key={note.id}>
//              <img src={note.author.avatar} alt={`${note.author.username} avatar`} height="50px" /> {' '}
//              {note.author.username} {note.createdAt} {note.favoriteCount} {' '}
//              {/**posso passar Markdown quando escrever as notes */}
//              <ReactMarkdown source={note.content} />
//            </article>
//          })}
//      </div>
//  );
    
    //se sucesso
    return (
      //passamos o array com elementos (obj para NoteFeed component)
      <React.Fragment>
          <NoteFeed notes={data.noteFeed.notes} />
          {/**Se hasNextPage for true, mostrar botao, lembrar que o componente Button é sempre true, hasNextPage tem de ser true para dar display */}
          {/** Duvida de conditionals no React ver : https://reactjs.org/docs/conditional-rendering.html */}
          {data.noteFeed.hasNextPage &&(
            //Paginação do GraphQL usando fetchMore
            //https://www.apollographql.com/docs/react/pagination/core-api/
          <Button 
          onClick={()=>
            fetchMore({
            variables:{
              cursor: data.noteFeed.cursor
            },
          updateQuery: (previousResult,{fetchMoreResult})=>{
            return {
              noteFeed:{
                cursor: fetchMoreResult.noteFeed.cursor,
                hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                //combinar novos resultados e os velhos
                notes:[
                  ...previousResult.noteFeed.notes,
                  ...fetchMoreResult.noteFeed.notes
                ],
                __typename:'noteFeed'
              }
            }
          }})}>Carregar mais notas</Button>)}
      </React.Fragment>
      
    )

};

/**
 * Nota: o react add espaço se {' '}
 */

export default Home;

/**
 * Basicamente os dados que estão a ser acedidos é o output do GraphQL playground,
 * sendo 'data' o obj principal
 * 
   {
  "data": {
    "noteFeed": {
      "cursor": "5fc0b1761f30ae40e8c389b3",
      "hasNextPage": false,
      "notes": [
        {
          "id": "5fc0b2a9c9eb1b46ece58f74",
          "createdAt": "2020-11-27T08:02:49.519Z",
          "content": "This is a note in our djgjgjgjtabase!",
          "favoriteCount": 0,
          "author": {
            "username": "BeerfgrfBoop",
            "id": "5fc0b09ca916e53a1033faac",
            "avatar": "https://www.gravatar.com/avatar/ae6a12d54217f42187160cdf35a10516.jpg?d=identicon"
          }
        },
        {
          "id": "5fc0b27cc9eb1b46ece58f73",
          "createdAt": "2020-11-27T08:02:04.789Z",
          "content": "This is a note in our djgjgjgjtabase!",
          "favoriteCount": 0,
          "author": {
            "username": "BeerfgrfBoop",
            "id": "5fc0b09ca916e53a1033faac",
            "avatar": "https://www.gravatar.com/avatar/ae6a12d54217f42187160cdf35a10516.jpg?d=identicon"
          }
        },
        {
          "id": "5fc0b27cc9eb1b46ece58f72",
          "createdAt": "2020-11-27T08:02:04.018Z",
          "content": "This is a note in our djgjgjgjtabase!",
          "favoriteCount": 0,
          "author": {
            "username": "BeerfgrfBoop",
            "id": "5fc0b09ca916e53a1033faac",
            "avatar": "https://www.gravatar.com/avatar/ae6a12d54217f42187160cdf35a10516.jpg?d=identicon"
          }
        },
        {
          "id": "5fc0b26bc9eb1b46ece58f71",
          "createdAt": "2020-11-27T08:01:47.353Z",
          "content": "This is a note in our database!",
          "favoriteCount": 0,
          "author": {
            "username": "BeerfgrfBoop",
            "id": "5fc0b09ca916e53a1033faac",
            "avatar": "https://www.gravatar.com/avatar/ae6a12d54217f42187160cdf35a10516.jpg?d=identicon"
          }
        },
        {
          "id": "5fc0b1761f30ae40e8c389b3",
          "createdAt": "2020-11-27T07:57:42.434Z",
          "content": "This is a note in our database!",
          "favoriteCount": 0,
          "author": {
            "username": "BeerfgrfBoop",
            "id": "5fc0b09ca916e53a1033faac",
            "avatar": "https://www.gravatar.com/avatar/ae6a12d54217f42187160cdf35a10516.jpg?d=identicon"
          }
        }
      ]
    }
  }
}
 */