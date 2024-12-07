import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import metas from '../assets/metas.png'

interface SignUpProps {
  onLoginClick: () => void
  onUserSignup: () => void;
}

export default function SignUp({ onLoginClick }: SignUpProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [cpf, setCpf] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSignup = async () => {
    if (isSubmitting) return;
  
    if (!fullName || !email || !phone || !cpf || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
  
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordPattern.test(password)) {
      setError(
        'Password must be at least 8 characters long and include letters, numbers, and special characters.'
      );
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    if (!validateCPF(cpf)) {
      setError('Invalid CPF');
      return;
    }
  
    // Mapeando `fullName` para `name` conforme esperado pelo backend
    const newUser = {
      name: fullName,
      email,
      phone,
      cpf,
      password,
    };
  
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3333/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        resetFields();
        onLoginClick();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create user');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const validateCPF = (cpfInput: string): boolean => {
    const cpf = cpfInput.replace(/\D/g, '')
    if (cpf.length !== 11) return false

    let sum = 0
    let remainder: number

    for (let i = 1; i <= 9; i++) {
      sum += Number.parseInt(cpf.charAt(i - 1)) * (11 - i)
    }

    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== Number.parseInt(cpf.charAt(9))) return false

    sum = 0
    for (let i = 1; i <= 10; i++) {
      sum += Number.parseInt(cpf.charAt(i - 1)) * (12 - i)
    }

    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== Number.parseInt(cpf.charAt(10))) return false

    return true
  }

  const resetFields = () => {
    setEmail('')
    setPassword('')
    setFullName('')
    setPhone('')
    setCpf('')
    setConfirmPassword('')
    setError('')
  }

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2')
  }

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
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
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
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
