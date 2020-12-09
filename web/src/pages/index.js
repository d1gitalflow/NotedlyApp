import React from 'react';
//novaVar
//add Redirect
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';

//Layout component
import Layout from '../components/Layout.js';

//gql query
const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;


//import route
import Home from './home.js';
import MyNotes from './mynotes.js';
import Favorites from './favorites.js';
//acede a 'match.params' do URL (dentro do div note.js)
import Note from './note.js';
import SignUp from './signup.js';
import SignIn from './signin.js';
import NewNote from './new.js';
import EditNote from './edit.js';




//define routes com 'react-router-dom' module
const Pages = () => {
    return (

        <Router>
            {/**meter routes dentro do Layout component */}
            <Layout>
                {/*diz o nome da route e que file/component carrega*/}
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/mynotes" component={MyNotes} />
                <PrivateRoute path="/favorites" component={Favorites} />
                <PrivateRoute path="/new" component={NewNote} />
                <PrivateRoute path="/edit/:id" component={EditNote} />
                {/**recebe id, passa pelo path=""  NOTA: este path é super abstracto passa ao note.js NotePage fn, sem destructuring*/}
                <Route path="/note/:id" component={Note} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
            </Layout>
        </Router>
    );
};

//privateRoute component, recebe react attributos(component) de <PrivateRouting>
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    // se esta carregar...
    if (loading) return <p>A carregar...</p>;
    // se existe erro
    if (error) return <p>Erro!</p>;
    // se user está loggado, redirect para a pagina pedida
    // se user _não está loggado redirect para /signup
    return (
        <Route
            {...rest}
            render={props =>
                data.isLoggedIn === true ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/signin',
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
};

/**
 * When we redirect a private route, we are also storing the referring
URL as state. This allows us to redirect users back to the page they
were originally attempting to navigate to. We could update our
redirect on the Sign In page to optionally use props.state.
location.from to enable this feature. */

export default Pages;