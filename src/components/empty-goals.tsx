import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import logo from '../assets/logo.svg'
import letsStart from '../assets/lets-start-illustration.svg'
import { useState, useRef, useEffect } from 'react'

// Definindo a interface User corretamente
interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
  createdAt: string
}

export function EmptyGoal() {
  const [user, setUser] = useState<User | null>(null); // Armazena o usuário do banco, pode ser null caso o usuário não esteja logado

  const [menuOpen, setMenuOpen] = useState(false); // Gerencia a abertura do menu
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Obtendo o ID do usuário logado (do localStorage)
        const loggedInUserId = localStorage.getItem('userId');
        
        if (!loggedInUserId) {
          throw new Error('Usuário não encontrado no localStorage');
        }
  
        console.log('Buscando dados do usuário com ID:', loggedInUserId);
  
        const response = await fetch(`http://localhost:3333/users/${loggedInUserId}`); 
  
        if (!response.ok) {
          console.error('Erro na resposta da API:', response.status, response.statusText);
          throw new Error('Erro ao carregar os dados do usuário');
        }
  
        const userData = await response.json();
        console.log('Dados do usuário carregados:', userData);
  
        if (userData) {
          setUser(userData); // Atualiza o estado com o usuário encontrado
        } else {
          console.error('Nenhum usuário encontrado');
        }
  
      } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error);
      }
    };
  
    fetchUserData(); // Chama a função ao carregar o componente
  }, []); // Apenas executa na montagem do componente
  

  const handleLogout = () => {
    // Função de logout, redirecionando para o login
    localStorage.removeItem('userId'); // Limpa o ID do usuário no localStorage
    setUser(null); // Limpa o usuário do estado
    window.location.href = '/login'; // Redireciona para a página de login
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alterna o estado do menu
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-white">
      {/* Cabeçalho fixo no topo */}
      <header className="w-full flex justify-between items-center p-4 bg-zinc-800 fixed top-0 left-0 z-50 shadow-lg">
        <img src={logo} alt="in.orbit" className="h-8" />
        <div className="flex items-center gap-4">
          <span className="text-sm">Bem-vindo, {user ? user.name : 'Usuário'}</span>
          <div className="relative">
            <Button 
              className="bg-zinc-700 hover:bg-zinc-600 transition duration-300" 
              onClick={toggleMenu} 
            >
              Menu
            </Button>
            {/* Menu Dropdown */}
            {menuOpen && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-48 bg-zinc-700 text-white rounded-lg shadow-lg transition-all duration-300"
              >
                <Button
                  className="w-full text-left px-4 py-2 hover:bg-zinc-600"
                  onClick={() => alert('Função Atualizar Cadastro em breve')}
                >
                  Atualizar Cadastro
                </Button>
                <Button
                  className="w-full text-left px-4 py-2 hover:bg-zinc-600"
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Conteúdo Principal*/}
      <div className="mt-20 flex flex-col items-center justify-center gap-8">
        <img src={letsStart} alt="in.orbit" className="max-h-80" />
        <p className="text-zinc-300 leading-relaxed max-w-2xl text-center">
          Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora mesmo?
        </p>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>
    </div>
  );
}
