interface CreateUserRequest {
  name: string
  email: string
  password: string
}

export async function createUser({
  name,
  email,
  password
}: CreateUserRequest) {
  await fetch('http://localhost:3333/users', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password
    }),
  })
}
