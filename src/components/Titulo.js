import styled from 'styled-components';

export default function Titulo() {
  return <Title>My Library</Title>;
}

const Title = styled.h1`
  font-family: 'Saira Stencil One', cursive;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  color: #ffffff;
  text-align: center;
  margin: 14px;
`;