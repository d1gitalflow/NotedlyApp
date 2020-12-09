import React, { useEffect } from 'react';
import { useMutation, useApolloClient} from '@apollo/client';
import UserForm from '../components/UserForm';

import { SIGNIN_USER } from '../gql/mutation.js';


const SignIn = props => {
    useEffect(() => {
        // update titulo
        document.title = 'Entrar — NotedlyApp';
    });
    const client = useApolloClient();
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            //guarda token localStorage
            localStorage.setItem('token', data.signIn);
            // update local cache
            client.writeData({ data: { isLoggedIn: true } });
            // redirect para home page
            props.history.push('/');
        }
    });
    return (
        <React.Fragment>
            <UserForm action={signIn} formType="signIn" />
            {/* carregar*/}
            {loading && <p>A carregar...</p>}
            {/* erro*/}
            {error && <p>Erro(signin.js) a entrar!</p>}
        </React.Fragment>
    );
};
export default SignIn;

