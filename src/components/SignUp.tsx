<<<<<<< HEAD
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useState } from 'react'
=======
import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
>>>>>>> 6484498 (header)
import metas from '../assets/metas.png'

interface SignUpProps {
  onLoginClick: () => void
  onUserSignup: (user: {
    fullName: string
    email: string
    phone: string
    cpf: string
    password: string
  }) => void
}

export default function SignUp({ onLoginClick, onUserSignup }: SignUpProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [cpf, setCpf] = useState('')
  const [error, setError] = useState('')
<<<<<<< HEAD
=======
  const [isSubmitting] = useState(false)

  // useEffect(() => {
  //   // Limpar o localStorage quando a página for recarregada
  //   window.onbeforeunload = () => {
  //     localStorage.clear()
  //   }
  // }, [])
>>>>>>> 6484498 (header)

  const handleSignup = () => {
    if (
      !fullName ||
      !email ||
      !phone ||
      !cpf ||
      !password ||
      !confirmPassword
    ) {
      setError('All fields are required')
      return
    }
    setError('')

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/
    if (!passwordPattern.test(password)) {
      setError(
        'Password must be at least 8 characters long and include letters, numbers, and special characters.'
      )
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!validateCPF(cpf)) {
      setError('Invalid CPF')
      return
    }

<<<<<<< HEAD
    const newUser = { fullName, email, phone, cpf, password }
=======
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')

    // Verificar se o email já está cadastrado
    if (existingUsers.some((user: { email: string }) => user.email === email)) {
      setError('Email is already registered')
      return
    }

    const newUser = { fullName, email, phone, cpf, password }

    // Salvar o novo usuário no localStorage
    existingUsers.push(newUser)
    localStorage.setItem('users', JSON.stringify(existingUsers))

>>>>>>> 6484498 (header)
    onUserSignup(newUser)
    alert('Cadastro realizado com sucesso!')
    resetFields()

    setTimeout(() => {
      onLoginClick()
    }, 2000)
  }

<<<<<<< HEAD
  const validateCPF = (cpfInput: string) => {
    const cpf = cpfInput.replace(/\D/g, '')
=======
  const handleLogin = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const user = existingUsers.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    )

    if (user) {
      onUserSignup(user)
      alert('Login realizado com sucesso!')
      resetFields()
    } else {
      setError('Invalid email or password')
    }
  }

  const validateCPF = (cpfInput: string) => {
    const cpf = cpfInput.replace(/\D/g, '') // Remove qualquer caractere não numérico
>>>>>>> 6484498 (header)
    if (cpf.length !== 11) return false

    let sum = 0
    let remainder: number

    for (let i = 1; i <= 9; i++) {
      sum += Number.parseInt(cpf.charAt(i - 1)) * (11 - i)
    }

    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) {
      remainder = 0
    }
    if (remainder !== Number.parseInt(cpf.charAt(9))) {
      return false
    }

    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum += Number.parseInt(cpf.charAt(i - 1)) * (12 - i)
    }

    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) {
      remainder = 0
    }
    if (remainder !== Number.parseInt(cpf.charAt(10))) {
      return false
    }

    return true
  }

  const resetFields = () => {
    setEmail('')
    setPassword('')
    setFullName('')
    setPhone('')
    setCpf('')
    setConfirmPassword('')
  }

  const formatPhone = (value: string) => {
    const formattedValue = value
<<<<<<< HEAD
      .replace(/\D/g, '')
=======
      .replace(/\D/g, '') // Remove caracteres não numéricos
>>>>>>> 6484498 (header)
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2')
      .replace(/-(\d{4})$/, '$1')

    return formattedValue.length <= 14
      ? formattedValue
      : formattedValue.slice(0, 14)
  }

  const formatCPF = (value: string) => {
    const formattedValue = value
<<<<<<< HEAD
      .replace(/\D/g, '')
=======
      .replace(/\D/g, '') // Remove caracteres não numéricos
>>>>>>> 6484498 (header)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')

    return formattedValue.length <= 14
      ? formattedValue
      : formattedValue.slice(0, 14)
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
            Sign Up
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form
            className="space-y-6"
            onSubmit={e => {
              e.preventDefault()
              handleSignup()
            }}
          >
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="w-full bg-zinc-800 text-white placeholder-zinc-400"
              />
            </div>
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
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={e => setPhone(formatPhone(e.target.value))}
                required
                placeholder="Enter your phone number"
                maxLength={15}
                className="w-full bg-zinc-800 text-white placeholder-zinc-400"
              />
            </div>
            <div>
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                value={cpf}
                onChange={e => setCpf(formatCPF(e.target.value))}
                required
                placeholder="Enter your CPF"
                maxLength={14}
                className="w-full bg-zinc-800 text-white placeholder-zinc-400"
              />
            </div>
            <div className="flex justify-between space-x-2">
              <div className="w-full">
                <Label htmlFor="password">Create Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Create a password"
                  className="w-full bg-zinc-800 text-white placeholder-zinc-400"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm your password"
                  className="w-full bg-zinc-800 text-white placeholder-zinc-400"
                />
              </div>
            </div>
            <div>
              <Button
                variant="primary"
                size="default"
                className="w-full"
                type="submit"
<<<<<<< HEAD
              >
                Sign Up
=======
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
>>>>>>> 6484498 (header)
              </Button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onLoginClick}
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none cursor-pointer"
              >
                Login here
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
