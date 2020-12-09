import React, { useEffect } from 'react';


import UserForm from '../components/UserForm.js';

//Para conseguir comunicar com API signup mutation escrita do lado do servidor,
//passar um username, email e password, e receber um JWT token
import { useMutation, useApolloClient} from '@apollo/client';

import { SIGNUP_USER } from '../gql/mutation';


const SignUp = props => {
    useEffect(() => {
        // titulo
        document.title = 'Inscrever — NotedlyApp';
    });



    const client = useApolloClient();

    //add mutation hook (import do graphQL)
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            // console.log the JSON Web Token quando mutation é feita
            console.log(data.signUp);
            //guarda JWT em localStorage(keyString,value)
            localStorage.setItem('token', data.signUp);
            //agora está guardado localmente no browser(cuidado com XSS attacks)
            //esta pronto para usar em graph mutations e queries.

            //update local cache
            client.writeData({ data: { isLoggedIn: true } });

            //Depois do signup, fazer redirect para a home page:
            //Usando React Router's 'history' fazemos redirect
            props.history.push('/');
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signup" />
            {/* se os dados estaoa carregar..*/}
            {loading && <p>A carregar...</p>}
            {/* Se houver erro*/}
            {error && <p>Erro(signup.js) a criar conta!</p>}
        </React.Fragment>
    );
};
export default SignUp;