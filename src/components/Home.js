import { MdExitToApp } from 'react-icons/md';
import { CgAdd, CgRemove } from 'react-icons/cg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { ContextLogin } from './Context';
import { getStoredUser } from './Persistencia';

export default function Timeline() {
  const { loggedUser } = useContext(ContextLogin);
  const [lancamento, setLancamento] = useState([]);
  const [removido, setRemovido] = useState('');
  const history = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${getStoredUser()}`,
    },
  };
  useEffect(() => {
    const promise = axios.get('https://api-library-q6bo.onrender.com/item');
    promise.then((resp) => {
      setLancamento(resp.data);
    });
  }, [removido]);
  function entrada() {
    history('/Novo');
  }
  function saida(item) {
    const promessa = axios.delete('https://api-library-q6bo.onrender.com/item/'+item);
    promessa.then((resp) => {
        setRemovido(item);
    }).catch((err) =>{
        console.log('servidor fora de área');
    })
  }
  function logout() {
    console.log(getStoredUser());
    const promessa = axios.delete('https://api-library-ii.onrender.com/signout', config);
    promessa
      .then((resp) => {
        localStorage.clear();
        history('/');
      })
      .catch((err) => {
        alert('servidor fora de área');
      });
  }
  return (
    <Principal>
      <Header>
        <Nome>Olá, {getStoredUser().nome}</Nome>
        <MdExitToApp onClick={logout} />
      </Header>
      <Wallet>
        {lancamento.length === 0 ? (
          <Texto>Não há registros de livros</Texto>
        ) : (
          lancamento.map((item) => (
            <Registros key={item.id}>
              <Data>{dayjs(item.ano_lancamento).format('MM/YYYY')}</Data>
              <Descricao>{item.autor}</Descricao>
              <Valor
                color={item.status ? '#03AC00' : '#C70000'}
              >
                {item.titulo}
              </Valor>
              <CgRemove onClick={() => saida(item.id)}/>
            </Registros>
          ))
        )}
      </Wallet>
      <Footer>
        <Botao onClick={entrada}>
          <InsideButton>
            <CgAdd />
            Novo livro
          </InsideButton>
        </Botao>
      </Footer>
    </Principal>
  );
}
const Total = styled.div`
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
  font-size: 17px;
  height: 30px;
  color: #000000;
  border-radius: 0 5px;
  padding: 5px 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  span {
    text-align: right;
    color: ${(props) => props.color};
  }
`;
const Descricao = styled.p`
  color: #000000;
  flex-grow: 1;
  text-overflow: ellipsis;
  word-wrap: none;
  margin-left: 8px;
  word-break: break-word;
`;
const Valor = styled.p`
  color: ${(props) => props.color};
  flex-shrink: 0;
  margin-right: 5px;
`;
const Data = styled.p`
  color: #c6c6c6;
  flex-shrink: 0;
`;
const Registros = styled.div`
  width: 100%;
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  justify-content: space-between;
  display: flex;
  flex-shrink: 0;
  margin: 10px;
`;
const Texto = styled.p`
  font-family: 'Raleway', sans-serif;
  font-weight: normal;
  font-size: 20px;
  text-align: center;
  color: #868686;
  width: 190px;
  margin: auto 0;
`;
const Footer = styled.div`
  width: calc(100% - 50px);
  display: flex;
  justify-content: space-between;
  height: 130px;
  position: fixed;
  bottom: 0;
  padding: 15px 0;
  padding-right: 10px;
`;
const InsideButton = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #ffffff;
  text-align: left;
  display: flex;
  flex-direction: column;
  padding-right: 30px;
  padding-left: 10px;
  svg {
    font-size: 20px;
  }
`;
const Botao = styled.button`
  background-color: #a328d6;
  width: 45%;
  height: 90px;
  margin-bottom: 35px;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  margin-top: 10px;
  color: #ffffff;
  :focus {
    outline: transparent;
  }
`;
const Wallet = styled.div`
  width: 100%;
  height: 70vh;
  background: #ffffff;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;
const Principal = styled.div`
  width: 100%;
  height: 100%;
  padding: 3px 30px;
  position: relative;
`;
const Header = styled.div`
  display: flex;
  color: #ffffff;
  justify-content: space-between;
  width: 100%;
  height: 75px;
  align-items: center;
  svg {
    font-size: 25px;
  }
`;

const Nome = styled.h1`
  font-family: 'Raleway', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
`;
