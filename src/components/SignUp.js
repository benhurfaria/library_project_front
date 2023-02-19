import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Titulo from './Titulo';

export default function Signup() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [email, setEmail] = useState('');
  const history = useNavigate();
  function cadastro() {
    const body = {
      name: nome,
      email,
      password,
    };
    if (password.length === 0 || email.length === 0) {
      alert('vc precisa digitar senha ou email');
    } else if (password === confirm) {
      const promise = axios.post('http://localhost:4000/signup', body);
      promise
        .then((resp) => {
          alert('cadastro feito com sucesso');
          history('/');
        })
        .catch((err) => {
          if (err.response.status === 400) {
            alert('email ja cadastrado');
          }
          if (err.response.status === 500) {
            alert('servidor fora de área');
          }
        });
    } else {
      alert('Senhas diferentes');
    }
  }

  return (
    <Principal>
      <Titulo />
      <Input
        placeholder="Nome"
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <Input
        placeholder="CPF"
        type="text"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
      />
      <Input
        placeholder="E-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        placeholder="Confirme a senha"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      
      <Botao onClick={cadastro}>Cadastrar</Botao>
      <Link to="/">
        <Texto>Já tem uma conta? Entre agora!</Texto>
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