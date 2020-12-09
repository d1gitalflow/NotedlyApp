import React, { useEffect } from 'react';
import { useMutation} from '@apollo/client';

//importar NoteForm.js react component:
import NoteForm from '../components/NoteForm.js';

import { NEW_NOTE } from '../gql/mutation.js';


//importa a query GET_NOTES e GET_MY_NOTES
import { GET_MY_NOTES, GET_NOTES } from '../gql/query.js';

const NewNote = props => {
    useEffect(() => {
        //titulo
        document.title = 'Nova Nota — NotedlyApp';
    });

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        refetchQueries:[{query:GET_MY_NOTES},{query:GET_NOTES}],
        onCompleted: data => {
            //quando completo , redireciona o user para a new page
            props.history.push(`note/${data.newNote.id}`);
        }
    });

    return (
        <React.Fragment>
            {/*msg erro durante loading*/}
            {loading && <p>A carregar...</p>}
            {/* se erro*/}
            {error && <p>Erro a gravar nota</p>}
            {/* o NoteForm component a passar a mutation data como prop*/}
            <NoteForm action={data} />
        </React.Fragment>
    );
};
export default NewNote;