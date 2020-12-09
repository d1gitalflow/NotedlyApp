import React from 'react';
//importar logo .svg
import logo from '../img/logo.svg';
//styled components
import styled from 'styled-components';

import { useQuery, gql } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';

//importar componente 'ButtonAsLink'
import ButtonAsLink from './ButtonAsLink';

//import local query
import { IS_LOGGED_IN } from '../gql/query.js';
//componente styled react que mostra o estado: Sair, Entrar, Inscrever
const UserState = styled.div`
  margin-left: auto;
`;


const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;


const Header = props => {
    //query hook para user state do user
    //acede directamente como query porque usamos a directiva 'isLogged @client'
    //UPDATE: add client para referenciar Apollo Store
    const { data, client } = useQuery(IS_LOGGED_IN);

    return (
        <HeaderBar>
            <img src={logo} alt="NotedlyApp Logo" height="40" />
            <LogoText>NotedlyApp</LogoText>
            {/** Se está logged, mostra 'Sair', se contrario mostra 'Inscrever'*/}
            <UserState>
                {data.isLoggedIn ? (
                <ButtonAsLink
                onClick={()=>{ //este onClick button faz isto tudo abaixo
                    //remover token
                    localStorage.removeItem('token');
                    //limpar local cache (https://www.apollographql.com/docs/react/networking/authentication/#reset-store-on-logout)
                    client.resetStore();
                    //update local cache
                    client.writeData({ data: { isLoggedIn: false } });
                    //redirect para home page
                    props.history.push('/');
                }}
                >
                Sair(Logout)
                </ButtonAsLink>) : (
                <p>
                    <Link to={'/signin'}>Entrar(Login)</Link> or {' '}
                    <Link to={'/signup'}>Inscrever(Signup</Link>
                </p>
                )}
            </UserState>
        </HeaderBar>

    );
};
//embrulhamos o Header component dentro de withRouter
export default withRouter(Header);