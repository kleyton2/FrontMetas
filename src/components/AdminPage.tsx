import { Button } from './ui/button';
import { Dialog } from './ui/dialog';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  role: string;
}

interface AdminPageProps {
  users: User[];
}

export const AdminPage = ({ users }: AdminPageProps) => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-violet-50 mb-6">
        Admin Dashboard
      </h2>

      <Dialog>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-2 text-violet-50">Full Name</th>
                <th className="px-4 py-2 text-violet-50">Email</th>
                {/* <th className="px-4 py-2 text-violet-50">Phone</th> */}
                {/* <th className="px-4 py-2 text-violet-50">Role</th> */}
                <th className="px-4 py-2 text-violet-50">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-zinc-700">
                  <td className="px-4 py-2 text-violet-100">{user.name}</td>
                  <td className="px-4 py-2 text-violet-100">{user.email}</td>
                  {/* <td className="px-4 py-2 text-violet-100">{user.phone}</td> */}
                  {/* <td className="px-4 py-2 text-violet-100">{user.role}</td> */}
                  <td className="px-4 py-2">
                    <Button variant="primary" size="default" className="mr-2">
                      Edit
                    </Button>
                    <Button variant="secondary" size="default">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dialog>

      <div className="mt-6 text-center">
        <Button variant="primary" size="default" onClick={() => alert('Criar novo usuário')}>
          Add New User
        </Button>
      </div>
    </div>
  );
};
