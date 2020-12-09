import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import NoteFeed from '../components/NoteFeed.js';
import { GET_MY_FAVORITES } from '../gql/query.js';

const Favorites = () => {
    useEffect(() => {
        // update do titulo da pagina
        document.title = 'Favoritos — NotedlyApp';
    });

    const { loading, error, data } = useQuery(GET_MY_FAVORITES);
    if (loading) return 'A carregar...';
    if (error) return `Erro! ${error.message}`;
    // se sucesso mostrar favortios
    // se insucesso nao mostrar favoritos
    if (data.me.favorites.length !== 0) {
        return <NoteFeed notes={data.me.favorites} />;
    } else {
        return <p>Sem favoritos ainda</p>;
    }
}

export default Favorites;