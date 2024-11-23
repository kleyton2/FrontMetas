import { useState } from 'react';
import { Dialog } from './components/ui/dialog';
import { CreateGoal } from './components/create-goal';
import { Summary } from './components/summary';
import { EmptyGoal } from './components/empty-goals';
import { useQuery } from '@tanstack/react-query';
import { getSummary } from './http/get-summary';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomePage from './components/home-page';
import { Header } from './components/ui/header';

interface User {
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
}

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação
  const [users, setUsers] = useState<User[]>([]); // Estado para armazenar usuários
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'signup' | 'goals'>('home'); // Estado para controlar qual página será exibida
  const [showHeader, setShowHeader] = useState(true); // Estado para controlar a visibilidade do Header

  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  });

  // Função chamada quando o login for bem-sucedido
  const handleLoginSuccess = (user: User) => {
    setIsAuthenticated(true);
    setCurrentPage('goals'); // Muda para a página de metas
    setShowHeader(false); // Esconde o Header após login
  };

  const handleSignUpClick = () => {
    setCurrentPage('signup'); // Muda para o formulário de cadastro
    setShowHeader(false); // Esconde o Header ao clicar em SignUp
  };

  const handleLoginClick = () => {
    setCurrentPage('login'); // Muda para o formulário de login
    setShowHeader(false); // Esconde o Header ao clicar em Login
  };

  // Função para adicionar um novo usuário
  const handleUserSignup = (newUser: User) => {
    setUsers([...users, newUser]); // Adiciona o novo usuário à lista
    setCurrentPage('login'); // Alterna para login após o cadastro
    setShowHeader(false); // Esconde o Header após o cadastro
  };

  return (
    <div>
      {/* Exibe o Header se a visibilidade estiver ativa */}
      {showHeader && <Header onLoginClick={handleLoginClick} onSignUpClick={handleSignUpClick} />}

      {/* Exibe a HomePage se estiver logado ou em qualquer outra tela de navegação */}
      {currentPage === 'home' && !isAuthenticated && <HomePage />}

      {/* Exibe o Login ou Signup com base no estado */}
      {currentPage === 'login' && (
        <Login
          onSignupClick={handleSignUpClick}
          onLoginSuccess={handleLoginSuccess}
          users={users}
        />
      )}

      {currentPage === 'signup' && (
        <SignUp
          onLoginClick={handleLoginClick}
          onUserSignup={handleUserSignup}
        />
      )}

      {/* Exibe a página de metas quando o usuário estiver autenticado */}
      {currentPage === 'goals' && isAuthenticated && (
        <Dialog>
          {data?.total && data.total > 0 ? <Summary /> : <EmptyGoal />}
          <CreateGoal />
        </Dialog>
      )}
    </div>
  );
}
