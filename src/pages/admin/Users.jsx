import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import UserCard from '../../components/UserCard';
import { deleteUserById, fetchUsers } from '../../features/users/userSlice';

function Users() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const { currentUser } = useSelector((state) => state.auth);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  function handleDelete(id) {
    if (id === currentUser.id) {
      return;
    }

    dispatch(deleteUserById(id));
  }

  if (loading) {
    return <Loader text="Loading users..." />;
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);
    const matchesRole = 
      roleFilter === 'all' || 
      user.role === roleFilter;
      return matchesSearch && matchesStatus && matchesRole;

    
  });

  return (
    <main className="mx-auto w-full max-w-5xl bg-slate-50 px-4 py-8">
      <section className="mb-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-950">Users</h1>
          <p className="mt-2 text-slate-600">View, edit, or delete registered accounts.</p>
        </div>
      </section>
      <section className='mb-6 flex flex-col gap-3 sm:flex-row'>
        <input 
          type='text'
          placeholder='Search by name or email...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='min-h-11 flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2'
          />

          <select 
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className='min-h-11 rounded-md border border-slate-300 bg-white px-3 py-2 text-center text-slate-600' >
              <option value='all'>All Users</option>
              <option value="active">Active Users</option>
              <option value="inactive">Inactive Users</option>
            </select>
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className='min-h-11 rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-600'
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
      </section>
      {error && <p className="font-semibold text-red-600">{error}</p>}

      <section className="grid gap-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={handleDelete}
          />
        ))
        ) : (
          <p className='rounded-lg border border-slate-200 bg-white p-6 text-center text-slate-600'>
            No users found.
          </p>
        )
        }
      </section>
    </main>
  )
}

export default Users
