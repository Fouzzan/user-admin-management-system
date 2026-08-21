import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../../components/UserCard';
import Loader from '../../components/Loader';
import { deleteUserById, fetchUsers } from '../../features/users/userSlice';

function Users() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const { currentUser } = useSelector((state) => state.auth);

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

  return (
    <main className="mx-auto w-full max-w-5xl bg-slate-50 px-4 py-8">
      <section className="mb-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-950">Users</h1>
          <p className="mt-2 text-slate-600">View, edit, or delete registered accounts.</p>
        </div>
      </section>

      {error && <p className="font-semibold text-red-600">{error}</p>}

      <section className="grid gap-3">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={handleDelete}
          />
        ))}
      </section>
    </main>
  )
}

export default Users
