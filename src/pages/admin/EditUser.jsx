import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate, useParams } from 'react-router-dom';

import Loader from '../../components/Loader';

import {
  fetchUserById,
  updateUserById
} from '../../features/users/userSlice';

function EditUser() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { selectedUser, loading, error } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    dispatch(
      updateUserById({
        id,
        updates: {
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          role: formData.get('role'),
          isActive: formData.has('isActive')
        }
      })
    )
      .unwrap()
      .then(() => navigate(`/admin/users/${id}`));
  }

  if (loading && !selectedUser) {
    return <Loader text="Loading user..." />;
  }

  if (!selectedUser && !loading) {
    return (
      <main className="min-h-screen bg-[#171717] p-8">
        <p className="text-gray-400">User not found.</p>
      </main>
    );
  }

  const initial = selectedUser?.name?.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-[#171717] px-5 py-8 text-gray-200">
      <div className="mx-auto w-full max-w-4xl">

        {/* Page Header */}
        <div className="mb-5">
          <p className="text-sm font-medium text-gray-500">
            User management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Edit user
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Update the user's profile, role, and account status.
          </p>
        </div>

        {/* Edit Card */}
        <section className="rounded-2xl border border-[#34373b] bg-[#1d1d1d] p-6 shadow-lg">

          {/* User Header */}
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

            {/* User Information */}
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

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-sm font-medium text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            className="mt-6"
            key={selectedUser.id}
            onSubmit={handleSubmit}
          >

            {/* Profile Details */}
            <div>

              <h3 className="text-lg font-semibold text-gray-200">
                Profile details
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Update the user's basic information.
              </p>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">

                {/* Name */}
                <label className="grid gap-2 text-sm font-medium text-gray-400">
                  Full name

                  <input
                    className="min-h-12 rounded-lg border border-[#393c40] bg-[#1a1a1a] px-4 py-3 text-base font-medium text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                    name="name"
                    defaultValue={selectedUser.name || ''}
                    required
                  />
                </label>

                {/* Phone */}
                <label className="grid gap-2 text-sm font-medium text-gray-400">
                  Phone

                  <input
                    className="min-h-12 rounded-lg border border-[#393c40] bg-[#1a1a1a] px-4 py-3 text-base font-medium text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                    name="phone"
                    defaultValue={selectedUser.phone || ''}
                    placeholder="Enter phone number"
                  />
                </label>

                {/* Email */}
                <label className="grid gap-2 text-sm font-medium text-gray-400 sm:col-span-2">
                  Email address

                  <input
                    className="min-h-12 rounded-lg border border-[#393c40] bg-[#1a1a1a] px-4 py-3 text-base font-medium text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                    name="email"
                    type="email"
                    defaultValue={selectedUser.email || ''}
                    required
                  />
                </label>

              </div>

            </div>

            {/* Account Settings */}
            <div className="mt-8 border-t border-[#34373b] pt-6">

              <h3 className="text-lg font-semibold text-gray-200">
                Account settings
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Manage the user's permissions and account access.
              </p>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">

                {/* Role */}
                <label className="grid gap-2 text-sm font-medium text-gray-400">
                  Role

                  <select
                    className="min-h-12 cursor-pointer rounded-lg border border-[#393c40] bg-[#1a1a1a] px-4 py-3 text-base font-medium text-gray-200 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                    name="role"
                    defaultValue={selectedUser.role || 'user'}
                  >
                    <option value="user">
                      User
                    </option>

                    <option value="admin">
                      Admin
                    </option>
                  </select>
                </label>

                {/* Account Status */}
                <div className="flex flex-col justify-end">

                  <p className="mb-2 text-sm font-medium text-gray-400">
                    Account status
                  </p>

                  <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-[#393c40] bg-[#1a1a1a] px-4 py-3 text-gray-300">

                    <input
                      className="h-4 w-4 cursor-pointer accent-blue-600"
                      name="isActive"
                      type="checkbox"
                      defaultChecked={Boolean(selectedUser.isActive)}
                    />

                    <span className="text-sm font-medium">
                      Active account
                    </span>

                  </label>

                </div>

              </div>

            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#34373b] pt-6 sm:flex-row sm:justify-end">

              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#45484d] bg-transparent px-5 py-2 font-semibold text-gray-300 transition hover:bg-[#292929]"
                to={`/admin/users/${selectedUser.id}`}
              >
                Cancel
              </Link>

              <button
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Saving changes...' : 'Save changes'}
              </button>

            </div>

          </form>

        </section>

      </div>
    </main>
  );
}

export default EditUser;