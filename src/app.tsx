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
import {AdminPage} from './components/AdminPage'; // Nova página para Admin

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
  role: 'admin' | 'user'; // Adicionando a propriedade 'role'
}

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação
  const [users, setUsers] = useState<User[]>([]); // Estado para armazenar usuários
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'signup' | 'goals' | 'admin'>('home'); // Adicionando 'admin' à lista de páginas
  const [showHeader, setShowHeader] = useState(true); // Estado para controlar a visibilidade do Header

  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  });

  // Função para carregar usuários da API
  const fetchUsersFromAPI = async () => {
    try {
      const response = await fetch('http://localhost:3333/users');
      if (!response.ok) {
        throw new Error('Erro ao carregar usuários');
      }
      const data = await response.json();
      return data.users; // Certifique-se de que sua resposta tenha um campo 'users'
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  // Função chamada quando o login for bem-sucedido
  const handleLoginSuccess = (user: User) => {
    setIsAuthenticated(true);

    // Carregar usuários da API após login
    fetchUsersFromAPI().then(fetchedUsers => {
      setUsers(fetchedUsers); // Atualiza o estado com os usuários carregados

      if (user.role === 'admin') {
        setCurrentPage('admin'); // Redireciona para a página de administração
      } else {
        setCurrentPage('goals'); // Redireciona para a página de metas
      }

      setShowHeader(false); // Esconde o Header após login
    });
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

      {/* Exibe a página de administração quando o usuário for administrador */}
      {currentPage === 'admin' && <AdminPage users={users} />}
    </div>
  );
}
