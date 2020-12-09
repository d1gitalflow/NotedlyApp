import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import ButtonAsLink from './ButtonAsLink';
// o TOGGLE_FAVORITE mutation
import { TOGGLE_FAVORITE } from '../gql/mutation';
// add GET_MY_FAVORITES query para refetch
import { GET_MY_FAVORITES } from '../gql/query';
const FavoriteNote = props => {
    //guarda count de favs no state
    const [count, setCount] = useState(props.favoriteCount);
    //guarda se user ja fez fav no state
    const [favorited, setFavorited] = useState(
        //ver se note existe na lista de fav do user
        props.me.favorites.filter(note => note.id === props.noteId).length > 0
    );
    // toggleFavorite mutation hook
    const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
        variables: {
            id: props.noteId
        },
        // refetch the GET_MY_FAVORITES query para update da cache
        refetchQueries: [{ query: GET_MY_FAVORITES }]
    });
    //se user fez fav à note, mostrar option para remover fav 
    //caso contrario mostra opção para add fav 
    return (
        <React.Fragment>
          {favorited ? (
            <ButtonAsLink
              onClick={() => {
                toggleFavorite();
                setFavorited(false);
                setCount(count - 1);
              }}
              data-cy="favorite"
            >
              Remove Favorito(rm fav)
            </ButtonAsLink>
          ) : (
            <ButtonAsLink
              onClick={() => {
                toggleFavorite();
                setFavorited(true);
                setCount(count + 1);
              }}
              data-cy="favorite"
            >
              Add Favorito(add fav)
            </ButtonAsLink>
          )}
          : {count}
        </React.Fragment>
      );
};
export default FavoriteNote;