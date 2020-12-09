import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
    height: 100%;
`;
const Form = styled.form`
    height: 100%;
`;
const TextArea = styled.textarea`
    width: 100%;
    height: 90%;
`;

const NoteForm = props => {
    // default state
    const [value, setValue] = useState({ content: props.content || '' });
    // update o state quando o user escreve no form
    const onChange = event => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        });
    };
    return (
        <Wrapper>
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    props.action({
                        variables: {
                            ...value
                        }
                    });
                }}
            >
                <TextArea
                    required
                    type="text"
                    name="content"
                    placeholder="Escrever aqui a nota"
                    value={value.content}
                    onChange={onChange}
                />
                <Button type="submit">Submeter</Button>
            </Form>
        </Wrapper>
    );
};

export default NoteForm;