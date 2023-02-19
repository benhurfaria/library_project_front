import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Titulo from './Titulo';
import { ContextLogin } from './Context';
import { storeUser, getStoredUser } from './Persistencia';

export default function SignIn() {
  const { setLoggedUser } = useContext(ContextLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  function login() {
    const body = {
      email,
      password,
    };
    const promise = axios.post('http://localhost:4000/signin', body);
    promise
      .then((resp) => {
        setLoggedUser(resp.data);
        storeUser(resp.data);
        setLoggedUser(resp.data);
        history('/timeline');
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert('Conta nao cadastrada');
        }
      });
  }
  useEffect(() => {
    const user = getStoredUser();
    user ? history('/timeline') : history('/');
  }, [history]);
  return (
    <Principal>
      <Titulo />
      <Input
        placeholder="E-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <Botao onClick={login}>Entrar</Botao>
      <Link to="/sign-up">
        <Texto>Primeira vez? Cadastre-se</Texto>
      </Link>
    </Principal>
  );
}
const Principal = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Texto = styled.p`
  text-align: center;
  margin-top: 20px;
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
  font-size: 14px;
  color: #ffffff;
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
  :focus {
    outline: transparent;
  }
`;