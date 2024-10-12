import { useState } from 'react'
import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'
import { EmptyGoal } from './components/empty-goals'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http/get-summary'
import Login from './components/Login'
import SignUp from './components/SignUp'

interface User {
  fullName: string
  email: string
  phone: string
  cpf: string
  password: string
}

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [users, setUsers] = useState<User[]>([]) // Estado para armazenar usuários
  const [currentUser, setCurrentUser] = useState<User | null>(null) // Estado para o usuário logado

  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  })

  const handleLoginSuccess = (user: User) => {
    setIsAuthenticated(true)
    setCurrentUser(user) // Armazena o usuário autenticado
  }

  const handleSignUpClick = () => {
    setShowSignUp(true)
  }

  const handleLoginClick = () => {
    setShowSignUp(false)
  }

  const handleUserSignup = (newUser: User) => {
    setUsers([...users, newUser]) // Adiciona o novo usuário ao estado
    setShowSignUp(false) // Alterna para a tela de login após o cadastro
  }

  return (
    <>
      {!isAuthenticated ? (
        showSignUp ? (
          <SignUp
            onLoginClick={handleLoginClick}
            onUserSignup={handleUserSignup}
          />
        ) : (
          <Login
            onSignupClick={handleSignUpClick}
            onLoginSuccess={handleLoginSuccess}
            users={users} // Passa a lista de usuários cadastrados para o Login
          />
        )
      ) : (
        <Dialog>
          {data?.total && data.total > 0 ? <Summary /> : <EmptyGoal />}
          <CreateGoal />
        </Dialog>
      )}
    </>
  )
}
