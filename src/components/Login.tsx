import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useState, useEffect } from 'react'
import metas from '../assets/metas.png'

interface User {
  fullName: string
  email: string
  phone: string
  cpf: string
  password: string
}

interface LoginProps {
  onSignupClick: () => void
  onLoginSuccess: (user: User) => void
}

export default function Login({ onSignupClick, onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    // Carregar usuários do localStorage na inicialização
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    setUsers(storedUsers)
  }, [])

  const handleLogin = () => {
    const user = users.find(u => u.email === email && u.password === password)
    if (user) {
      // Salva o usuário no localStorage
      localStorage.setItem('user', JSON.stringify(user))

      // Chama a função para passar o usuário autenticado
      onLoginSuccess(user)
    } else {
      setError('Email ou senha inválidos')
    }
  }

  return (
    <div className="flex h-screen">
      <div
        className="w-[70%] bg-cover bg-center hidden lg:block"
        style={{ backgroundImage: `url(${metas})` }}
      />
      <div className="w-full lg:w-[30%] flex items-center justify-center bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-violet-50">
            Login
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full bg-zinc-800 text-white placeholder-zinc-400"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full bg-zinc-800 text-white placeholder-zinc-400"
              />
            </div>
            <div>
              <Button
                variant="primary"
                size="default"
                className="w-full"
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSignupClick}
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none cursor-pointer"
              >
                Sign Up here
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
