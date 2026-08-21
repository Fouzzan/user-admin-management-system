
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { fetchUsers } from '../../features/users/userSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const activeUsers = users.filter((user) => user.isActive).length;
  const admins = users.filter((user) => user.role === 'admin').length;

  if (loading) {
    return <Loader text="Loading dashboard..." />;
  }

  return (
    <main className="mx-auto w-full max-w-5xl bg-slate-50 px-4 py-8">
      <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-bold text-slate-950">Dashboard</h1>
        <Link className="inline-flex min-h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white" to="/admin/users">Manage Users</Link>
      </section>

      {error && <p className="font-semibold text-red-600">{error}</p>}

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-sm text-slate-500">Total Users</span>
          <strong className="mt-2 block text-4xl font-bold text-slate-950">{users.length}</strong>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-sm text-slate-500">Active Users</span>
          <strong className="mt-2 block text-4xl font-bold text-slate-950">{activeUsers}</strong>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-sm text-slate-500">Admins</span>
          <strong className="mt-2 block text-4xl font-bold text-slate-950">{admins}</strong>
        </div>
      </section>
    </main>
  )
}

export default Dashboard
