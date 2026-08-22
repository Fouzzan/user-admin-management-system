import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useParams } from 'react-router-dom';

import Loader from '../../components/Loader';

import { fetchUserById } from '../../features/users/userSlice';

function UserDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { selectedUser, loading, error } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loader text="Loading user..." />;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#171717] p-8">
        <p className="font-semibold text-red-400">{error}</p>
      </main>
    );
  }

  if (!selectedUser) {
    return (
      <main className="min-h-screen bg-[#171717] p-8">
        <p className="text-gray-400">User not found.</p>
      </main>
    );
  }

  const initial = selectedUser.name?.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-[#171717] px-5 py-8 text-gray-200">
      <div className="mx-auto w-full max-w-4xl">

        {/* Page Heading */}
        <div className="mb-5">
          <p className="text-sm font-medium text-gray-500">
            User management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            User profile
          </h1>
        </div>

        {/* User Profile Card */}
        <section className="rounded-2xl border border-[#34373b] bg-[#1d1d1d] p-6 shadow-lg">

          {/* Profile Header */}
          <div className="flex flex-col gap-5 border-b border-[#34373b] pb-6 sm:flex-row sm:items-center">

            {/* Avatar */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-950 text-2xl font-bold text-blue-300">

              {selectedUser.profilePicture ? (
                <img
                  src={selectedUser.profilePicture}
                  alt={selectedUser.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                initial
              )}

            </div>

            {/* Name and Email */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-100">
                {selectedUser.name}
              </h2>

              <p className="mt-1 text-gray-400">
                {selectedUser.email}
              </p>
            </div>

            {/* Role Badge */}
            <span
              className={`inline-flex w-fit rounded-xl px-4 py-2 text-sm font-semibold ${
                selectedUser.role === 'admin'
                  ? 'bg-orange-950 text-orange-300'
                  : 'bg-blue-950 text-blue-300'
              }`}
            >
              {selectedUser.role === 'admin' ? 'Admin' : 'User'}
            </span>

          </div>

          {/* Profile Details */}
          <div className="py-6">

            <h3 className="mb-5 text-lg font-semibold text-gray-200">
              Profile details
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">

              {/* Name */}
              <div>
                <p className="mb-2 text-sm font-medium text-gray-400">
                  Full name
                </p>

                <div className="rounded-lg border border-[#393c40] bg-[#1a1a1a] px-4 py-3 text-lg font-semibold text-gray-200">
                  {selectedUser.name}
                </div>
              </div>

              {/* Phone */}
              <div>
                <p className="mb-2 text-sm font-medium text-gray-400">
                  Phone
                </p>

                <div className="rounded-lg border border-[#393c40] bg-[#1a1a1a] px-4 py-3 text-lg font-semibold text-gray-200">
                  {selectedUser.phone || 'Not added'}
                </div>
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <p className="mb-2 text-sm font-medium text-gray-400">
                  Email
                </p>

                <div className="break-all rounded-lg border border-[#393c40] bg-[#1a1a1a] px-4 py-3 text-lg font-semibold text-gray-200">
                  {selectedUser.email}
                </div>
              </div>

            </div>

          </div>

          {/* Account Status */}
          <div className="flex flex-col gap-4 border-t border-[#34373b] py-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="font-semibold text-gray-200">
                Account status
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Current account access status
              </p>
            </div>

            <span
              className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                selectedUser.isActive
                  ? 'bg-green-950 text-green-400'
                  : 'bg-red-950 text-red-400'
              }`}
            >
              {selectedUser.isActive ? '● Active' : '● Inactive'}
            </span>

          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#34373b] pt-6 sm:flex-row sm:justify-end">

            <Link
              to="/admin/users"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#45484d] bg-transparent px-5 py-2 font-semibold text-gray-300 transition hover:bg-[#292929]"
            >
              ← Back
            </Link>

            <Link
              to={`/admin/users/${selectedUser.id}/edit`}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-500"
            >
              Edit user
            </Link>

          </div>

        </section>
      </div>
    </main>
  );
}

export default UserDetails;