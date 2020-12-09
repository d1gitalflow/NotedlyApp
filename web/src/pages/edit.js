import React from 'react';
import { useQuery, useMutation} from '@apollo/client';


// query
import { GET_NOTE, GET_ME } from '../gql/query';

import NoteForm from '../components/NoteForm.js';

import { EDIT_NOTE } from '../gql/mutation.js';




const EditNote = props => {
    //guarda 'id' encontrado no url em id
    const id = props.match.params.id;
        // define query
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
        // fetch data do user atual
    const { data: userdata } = useQuery(GET_ME);
    // define mutation
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            props.history.push(`/note/${id}`);
        }
    });
    // se loading
    if (loading) return 'A carregar...';
    // se erro
    if (error) return <p>Erro!</p>;
    // se user atual e author da nota nao batem certo
    if (userdata.me.id !== data.note.author.id) {
        return <p>Não tens acesso para editar esta nota</p>;
    }
    // passar os dados e a mutation para NoteForm component
    return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;