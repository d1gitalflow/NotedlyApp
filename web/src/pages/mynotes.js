import React, { useEffect } from 'react';
import { useQuery} from '@apollo/client';
import NoteFeed from '../components/NoteFeed';
import { GET_MY_NOTES } from '../gql/query';

const MyNotes = () => {
    useEffect(() => {
        // update to titulo da pagina
        document.title = 'Minhas Notas — NotedlyApp';
    });

    const { loading, error, data } = useQuery(GET_MY_NOTES);

    if (loading) return 'A carregar...';
    if (error) return `Erro(mynotes.js)! ${error.message}`;
    //se sucesso mostrar minhas notas, se insucesso mostrar 'Sem notas ainda'.
    if (data.me.notes.length !== 0) {
        return <NoteFeed notes={data.me.notes} />;
    } else {
        return <p>Sem notas ainda</p>;
    }
};

export default MyNotes;

// https://reactjs.org/docs/hooks-reference.html#useeffect