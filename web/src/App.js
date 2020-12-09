import React from 'react';
import ReactDOM from 'react-dom';

//import de routes
//nota: o import procura a folder 'pages' e faz sempre import automatico ao index.js,
//import manual seria './pages/index.js' 
import Pages from './pages'

//importar global styles
import GlobalStyle from './components/GlobalStyle.js';

//importar Apollo client Lib
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
//importar modulo 'dotenv' para o: process.env.API_URI aceder a .env (demorou a debuggar)
//dentro do config() pode-se passar o path
require('dotenv').config();

import { setContext } from 'apollo-link-context';




//configurar API URI client instance
const uri = process.env.API_URI;//vem do .env
const httpLink = createHttpLink({ uri })
const cache = new InMemoryCache(); //inicializar cache

//check token e devolve os headers para context
/**each API call receives a
token in the header of the HTTP request. */
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    };
});


//configurar apollo client (https://www.apollographql.com/docs/react/api/core/ApolloClient/)
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    //permite fazer queries na local cache
    resolvers: {},
    connectToDevTools: true
}); //podemos agora passar info do user logged in para a API

//check do token na local cache
const data = {
    isLoggedIn: !!localStorage.getItem('token')
};

//escreve para a cache os dados do load inicial
cache.writeData({ data });

//escreve data depois do reset na localcache
client.onResetStore(() => cache.writeData({ data }));

const App = () => {
    return (
        <div>
            <ApolloProvider client={client}>
                <GlobalStyle />
                <Pages />
            </ApolloProvider>

        </div>
    );
};


ReactDOM.render(<App />, document.getElementById('root'));

