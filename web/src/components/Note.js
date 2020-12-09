import React from 'react';
import ReactMarkdown from 'react-markdown';

//datas - date-fns lib
import { format } from 'date-fns';

//style components
import styled from 'styled-components';





import { useQuery } from '@apollo/client';
// importar logged user UI components
import NoteUser from './NoteUser';
// importar query is_logged_in
import { IS_LOGGED_IN } from '../gql/query';


//CSS-in-js:
//limitar notes de esticar mais de 800px
const StyledNote = styled.article`
max-width: 800px;
margin: 0 auto;
`;

//metadata style note
const MetaData = styled.div`
@media (min-width: 500px) {
display: flex;
align-items: top;
}
`;

//add espaço entre avatar e outros
const MetaInfo = styled.div`
padding-right: 1em;
`;

//alinhar UserActions à direita em ecrans largos
const UserActions = styled.div`
margin-left: auto;
`;

//refractored mais abaixo
/*const Note = ({ note }) => {
    return (
        //gera as notes e exporta-se para NoteFeed.js component
        <article>
            <img
                src={note.author.avatar}
                alt="{note.author.username} avatar"
                height="50px"
            />{' '}
            {note.author.username} {format(note.createdAt, 'Do MMM YYYY')} {note.favoriteCount}{' '}
            <ReactMarkdown source={note.content} />
        </article>
    )
}*/

//para saber o que é cada componente, ver acima.
const Note = ({ note }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    if (loading) return <p>A carregar...</p>;
    if (error) return <p>Erro!</p>;
    return (
        <StyledNote>
            <MetaData>
                <MetaInfo>
                    <img
                        src={note.author.avatar}
                        alt={`${note.author.username} avatar`}
                        height="50px"
                    />
                </MetaInfo>
                <MetaInfo>
                    <em>por</em> {note.author.username} <br />
                    {format(note.createdAt, 'MMM Do YYYY')}
                </MetaInfo>
                {data.isLoggedIn ? (
                    <UserActions>
                        <NoteUser note={note} />
                    </UserActions>
                ) : (
                        <UserActions>
                            <em>Favoritos:</em> {note.favoriteCount}
                        </UserActions>
                    )}
            </MetaData>
            <ReactMarkdown source={note.content} />
        </StyledNote>
    );
};

export default Note;