import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import { fetchUsers } from '../../features/users/userSlice';

function Dashboard() {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const activeUsers = users.filter(
    (user) => user.isActive
  ).length;

  const admins = users.filter(
    (user) => user.role === 'admin'
  ).length;

  const activePercentage =
    users.length > 0
      ? Math.round((activeUsers / users.length) * 100)
      : 0;

  if (loading) {
    return <Loader text="Loading dashboard..." />;
  }

  return (
    <main className="min-h-full bg-[#181818] px-6 py-8 text-slate-200">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-100">
              User management
            </h1>

            <p className="mt-1 text-base font-medium text-slate-400">
              {users.length} people across {admins + 1} roles
            </p>
          </div>

          <Link
            to="/admin/users"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 py-2.5 font-semibold text-slate-900 transition hover:bg-white"
          >
            <span className="text-xl font-normal">+</span>
            Manage users
          </Link>
        </section>

        {/* Error */}
        {error && (
          <p className="mb-6 rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 font-medium text-red-400">
            {error}
          </p>
        )}

        {/* Statistics */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {/* Total Users */}
          <div className="rounded-xl border border-emerald-800/40 bg-[#1f6b5c] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-xl">
              ♧
            </div>

            <strong className="mt-5 block text-4xl font-bold text-white">
              {users.length}
            </strong>

            <span className="mt-1 block text-sm font-medium text-emerald-100">
              Total users
            </span>
          </div>

          {/* Admins */}
          <div className="rounded-xl border border-orange-900/40 bg-[#a63f1d] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-xl">
              ♙
            </div>

            <strong className="mt-5 block text-4xl font-bold text-white">
              {admins}
            </strong>

            <span className="mt-1 block text-sm font-medium text-orange-100">
              Admins
            </span>
          </div>

          {/* Active Percentage */}
          <div className="rounded-xl border border-pink-900/40 bg-[#923654] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-xl">
              ⚡
            </div>

            <strong className="mt-5 block text-4xl font-bold text-white">
              {activePercentage}%
            </strong>

            <span className="mt-1 block text-sm font-medium text-pink-100">
              Active users
            </span>
          </div>

        </section>

        {/* Quick Summary */}
        <section className="mt-8 rounded-xl border border-[#303030] bg-[#202020] p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-lg font-semibold text-slate-100">
                User overview
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Manage user accounts, roles, and account status.
              </p>
            </div>

            <Link
              to="/admin/users"
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#3a3a3a] bg-[#252525] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-[#303030]"
            >
              View all users →
            </Link>

          </div>
        </section>

      </div>
    </main>
  );
}

export default Dashboard;