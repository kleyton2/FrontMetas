import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import logo from '../assets/logo.svg'
import letsStart from '../assets/lets-start-illustration.svg'
import { useState, useRef } from 'react'

export function EmptyGoal() {
  const [user] = useState(() => {
    const storedUser = localStorage.getItem('user') // Busca o usuário no localStorage
    return storedUser ? JSON.parse(storedUser) : null
  })
  
  const [menuOpen, setMenuOpen] = useState(false); // Gerencia a abertura do menu
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('user') // Remove o usuário do localStorage
    window.location.href = '/login' // Redireciona para a página de login
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Alterna o estado do menu
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-white">
      {/* Cabeçalho fixo no topo */}
      <header className="w-full flex justify-between items-center p-4 bg-zinc-800 fixed top-0 left-0 z-50 shadow-lg">
        <img src={logo} alt="in.orbit" className="h-8" />
        <div className="flex items-center gap-4">
          <span className="text-sm">Bem-vindo, {user.fullName}!</span>
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

      {/* Conteúdo Principal com margem para o header fixo */}
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
  )
}
