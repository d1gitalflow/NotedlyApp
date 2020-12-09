import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
// import get_me query
import { GET_ME } from '../gql/query';

import DeleteNote from './DeleteNote';

import FavoriteNote from './FavoriteNote';

const NoteUser = props => {
    const { loading, error, data } = useQuery(GET_ME);
    if (loading) return <p>A carregar...</p>;
    if (error) return <p>Erro!</p>;
    return (
        <React.Fragment>
            <FavoriteNote
                me={data.me}
                noteId={props.note.id}
                favoriteCount={props.note.favoriteCount}
            />
            <br />
            {data.me.id === props.note.author.id && (
                <React.Fragment>
                    <Link to={`/edit/${props.note.id}`}>Editar</Link> <br />
                    <DeleteNote noteId={props.note.id} />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};
export default NoteUser;