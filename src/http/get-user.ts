type UsersResponse = {
  id: string;
  name: string;
  email: string;
  role: string; // 'admin' ou 'user'
  createdAt: string;
}[];

export async function getUsers(): Promise<UsersResponse> {
  const response = await fetch('http://localhost:3333/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar usuários');
  }

  const data = await response.json();
  return data; // Retorna a lista de usuários do backend
}
