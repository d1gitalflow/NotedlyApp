import React from 'react';
import Note from './Note.js'; //importar note para renderização aqui e passagem de valor

//styled components import:
import styled from 'styled-components';

const NoteWrapper = styled.div`
max-width: 800px;
margin: 0 auto;
margin-bottom: 2em;
padding-bottom: 2em;
border-bottom: 1px solid #f5f4f0;
`;



//recebe de home.js em formato obj e faz deconstruct de 'notes'
//REFRACTORIZADO (ver abaixo)
//const NoteFeed = ({ notes }) => {
//    return (
//        <div>
//            {/**cria divs individuais e que passam 'note' para 'Note' component e renderizam */}
//            {notes.map(note => (
//                <div key={note.id}>
//                    <Note note={note} />
//                </div>
//            ))}
//        </div>
//    )
//};

//import link por motivos de criar permalink
import {Link} from 'react-router-dom';

const NoteFeed = ({ notes }) => {
    return (
        //Antigo div que envolvia o note agora é styled component 'NoteWrapper'
        <div className="note-feed">
            {notes.map(note => (
                <NoteWrapper key={note.id}>
                    <Note note={note} />
                    {/**Link aponta para: PermaLink anchor*/}
                    <Link to={`note/${note.id}`}>PermaLink</Link>
                </NoteWrapper>
            ))}
        </div>
    );
};

export default NoteFeed; //exporta para home.js