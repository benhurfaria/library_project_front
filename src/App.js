import SignIn from './components/SignIn';
import Signup from './components/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContextLogin } from './components/Context';
import { useState } from 'react';

export default function App() {
  const [loggedUser, setLoggedUser] = useState({});
  return (
    <ContextLogin.Provider value={{ loggedUser, setLoggedUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route path="/sign-up" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </ContextLogin.Provider>
  );
}