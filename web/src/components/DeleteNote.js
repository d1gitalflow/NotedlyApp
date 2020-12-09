import React from 'react';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';

import { DELETE_NOTE } from '../gql/mutation';
// import para refetch depois de apagado
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

const DeleteNote = props => {
    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: {
            id: props.noteId
        },
        //refetch a note list queries para atualizar a cache
        refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES }],
        onCompleted: data => {
            // redirect user para /mynotes
            props.history.push('/mynotes');
        }
    });
    return <ButtonAsLink onClick={deleteNote}>Apagar Note(Delete)</ButtonAsLink>;
};
export default withRouter(DeleteNote);