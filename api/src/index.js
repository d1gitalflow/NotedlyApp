const express = require('express');
const app = express(); //app é obj
const { ApolloServer } = require('apollo-server-express'); //apolo server, (não apolo gql)
require('dotenv').config(); //é para carregar o file .env e aceder ao DB_HOST
const db = require('./db.js'); //importa db stuff (é um obj com 2 metodos)
//models é obj q recebe uma class para instanciar
const models = require('./models/index.js') //faz uma ganda viagem até aos schemas na pasta models/note.js
const jwt = require('jsonwebtoken');//sign e validar tokens de user timeout session
const helmet = require('helmet'); //middleware para common web security
const cors = require('cors'); //enabling cross-origin requests from all domains
//DATA LIMITING (defesas contra DDOS, pacotes do GraphQL)
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');



const port = process.env.PORT || 4001;

//DB stuff (recebe a string the connection à db graças ao .env)
const DB_HOST = process.env.DB_HOST;
//call à db com a string passada ao DB_HOST
//Atenção muito bem delineada a coneção à db
db.connect(DB_HOST);







//Dev test:
let notes = [
    { id: '1', content: 'This is a note', author: 'Adam Scott' },
    { id: '2', content: 'This is another note', author: 'Harlow Everly' },
    { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];







app.get('/', (req, res) => res.send('Hello World'));
//MiddleWare
app.use(helmet()); //security
app.use(cors()); //cross-origin request from all domains



//Receber user info de um JWT
//verificação se é user logado
const getUser = (token) => {
    if(token){
        try{
            //devolver o user information do apartir do JWT token
            return jwt.verify(token,process.env.JWT_SECRET);
        } catch(err){
            throw new Error('Sessão invalida');
        }
    }
}


//recebe de schema.js e passa lá em baixo para class ApolloServer
const typeDefs = require('./schema.js'); 
//resolvers importados de query.js e mutation.js da pasta resolvers
const resolvers = require('./resolvers/index.js')
//apollo server setup passando os dois objs já deconst+ 'context:' que passa info(models importado) para dentro dos resolver
//Novidade, vai ser inserido uma pequena logica para validar o user:
//grab o token do http header req
//tentar validar o tokene se valido,
//adicionar user information para resolver context
//NOTA: o {req} no context é um http req (que carrega uma payload, neste caso header)
//Data Limite usa: depthLimit e createComplexityLimitRule
const server = new ApolloServer({ 
    typeDefs,
    resolvers, 
    validationRules:[depthLimit(5),createComplexityLimitRule(1000)],
    context:({req})=>{
    //recebe token do http req header
    const token = req.headers.authorization;
    //tenta devolver um user com o token
    const user = getUser(token);
    //logar
    console.log(user);
    return {models,user} }});
//Passa app e path /api para methodo middleware deconst
server.applyMiddleware({ app, path: '/api' });

app.listen(port, () => console.log(`Server running at http:localhost:${port}${server.graphqlPath}`));