import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/Loader';

import UserCard from '../../components/UserCard';

import { deleteUserById, fetchUsers } from '../../features/users/userSlice';

function Users() {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector(
    (state) => state.users
  );

  const { currentUser } = useSelector(
    (state) => state.auth
  );

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

  // Summary data
  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.isActive
  ).length;

  const inactiveUsers = users.filter(
    (user) => !user.isActive
  ).length;

  const adminUsers = users.filter(
    (user) => user.role === 'admin'
  ).length;

  if (loading) {
    return <Loader text="Loading users..." />;
  }

  return (
    <main className="min-h-screen bg-[#181818] px-4 py-8 text-[#e8e1d5] md:px-8">

      <div className="mx-auto w-full max-w-7xl">

        {/* Page Header */}
        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              User management
            </h1>

            <p className="mt-1 text-sm text-[#aaa39a]">
              {totalUsers} people across 2 roles
            </p>
          </div>

          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#f1f1f1] px-5 py-2 font-semibold text-[#1b1b1b] transition hover:bg-white"
          >
            <span className="text-xl font-normal">+</span>
            Add user
          </button>

        </section>

        {/* Statistics Cards */}
        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          {/* Total Users */}
          <div className="rounded-xl bg-[#236c5e] p-5">
            <p className="text-xl">♧</p>

            <p className="mt-5 text-3xl font-bold">
              {totalUsers}
            </p>

            <p className="mt-1 text-sm font-medium text-[#d4ddd8]">
              Total users
            </p>
          </div>

          {/* Admins */}
          <div className="rounded-xl bg-[#a63f1d] p-5">
            <p className="text-xl">♧</p>

            <p className="mt-5 text-3xl font-bold">
              {adminUsers}
            </p>

            <p className="mt-1 text-sm font-medium text-[#f0d5cc]">
              Admins
            </p>
          </div>

          {/* Active */}
          <div className="rounded-xl bg-[#963857] p-5">
            <p className="text-xl">⚡</p>

            <p className="mt-5 text-3xl font-bold">
              {activeUsers}
            </p>

            <p className="mt-1 text-sm font-medium text-[#ead4dc]">
              Active users
            </p>
          </div>

          {/* Inactive */}
          <div className="rounded-xl bg-[#3d4657] p-5">
            <p className="text-xl">◌</p>

            <p className="mt-5 text-3xl font-bold">
              {inactiveUsers}
            </p>

            <p className="mt-1 text-sm font-medium text-[#d7dbe1]">
              Inactive users
            </p>
          </div>

        </section>

        {/* Filters */}
        <section className="mb-6 flex flex-col gap-3 md:flex-row">

          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa39a]">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-h-11 w-full rounded-lg border border-[#3a3a3a] bg-[#202020] py-2 pl-11 pr-4 text-[#e8e1d5] placeholder:text-[#777] outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="min-h-11 rounded-lg border border-[#3a3a3a] bg-[#202020] px-4 text-[#d4cec5] outline-none focus:border-blue-500"
          >
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="min-h-11 rounded-lg border border-[#3a3a3a] bg-[#202020] px-4 text-[#d4cec5] outline-none focus:border-blue-500"
          >
            <option value="all">All roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

        </section>

        {error && (
          <p className="mb-4 rounded-lg border border-red-900 bg-red-950/30 p-4 font-semibold text-red-400">
            {error}
          </p>
        )}

        {/* Users Table */}
        <section className="overflow-hidden rounded-xl border border-[#323232] bg-[#1e1e1e]">

          {/* Table Header */}
          <div className="hidden border-b border-[#323232] px-3 py-4 text-sm font-medium text-[#aaa39a] md:grid md:grid-cols-[minmax(220px,1fr)_120px_120px_auto] md:items-center">

            <div className="flex items-center gap-3">
              {/* <input
                type="checkbox"
                className="h-4 w-4 rounded border border-[#6b6b6b]"
              /> */}

              <span>Name</span>
            </div>

            <span>Status</span>

            <span>Role</span>

            <span>Actions</span>

          </div>

          {/* User Rows */}
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="p-10 text-center text-[#aaa39a]">
              No users found.
            </div>
          )}

        </section>

      </div>

    </main>
  );
}

export default Users;