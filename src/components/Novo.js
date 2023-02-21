import styled from 'styled-components';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ContextLogin } from './Context';

export default function Novo() {
  const { loggedUser } = useContext(ContextLogin);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [ano_lancamento, setAnoLancamento] = useState('');
  const history = useNavigate();

  function salvarNovo() {
    
    const body = {
      status: true,
      titulo,
      ano_lancamento,
      autor,
    };

    const promise = axios.post('https://api-library-q6bo.onrender.com/item', body);
    promise.then((resp) => {
        history('/Home');
    });
  }
  
  return (
    <Principal>
      <Header>
        <Nome>Novo livro</Nome>
      </Header>
      <Input
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
      />
      <Input
        placeholder="Titulo"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <Input
        placeholder="Ano de lancamento"
        value={ano_lancamento}
        onChange={(e) => setAnoLancamento(e.target.value)}
      />
      <Botao onClick={salvarNovo}>Salvar novo livro</Botao>
    </Principal>
  );
}

const Botao = styled.button`
  background-color: #a328d6;
  width: 100%;
  height: 48px;
  margin-bottom: 35px;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  margin-top: 10px;
  color: #ffffff;
  font-weight: bold;
  :focus {
    outline: transparent;
  }
`;
const Nome = styled.h1`
  font-family: 'Raleway', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
`;
const Input = styled.input`
  background: #ffffff;
  border-radius: 5px;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  font-family: 'Raleway', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: #000000;
  border: none;
  padding-left: 15px;
  :focus {
    outline: transparent;
  }
`;
const Principal = styled.div`
  width: 100%;
  height: 100%;
  padding: 3px 30px;
`;
const Header = styled.div`
  display: flex;
  color: #ffffff;
  justify-content: space-between;
  width: 100%;
  height: 75px;
  align-items: center;
`;