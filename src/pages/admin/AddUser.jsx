import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../../features/users/userSlice';
import { validatePassword, validateUserDetails } from '../../utils/userValidation';

function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    isActive: true
  });
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleChange(event) {
    const { name, type, checked, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormError('');

    const detailsError = validateUserDetails(formData);
    const passwordError = validatePassword(formData.password);

    if (detailsError || passwordError) {
      setFormError(detailsError || passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    dispatch(createUser({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
      role: formData.role,
      isActive: formData.isActive,
      profilePicture: ''
    }))
      .unwrap()
      .then((user) => navigate(`/admin/users/${user.id}`))
      .catch(() => {
        // The request error is shown from Redux state.
      });
  }

  return (
    <main className="min-h-screen bg-[#171717] px-5 py-8 text-gray-200">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-5">
          <p className="text-sm font-medium text-gray-500">User management</p>
          <h1 className="mt-1 text-3xl font-bold text-white">Add user</h1>
          <p className="mt-2 text-sm text-gray-400">Create an account and set its access level.</p>
        </div>

        <section className="rounded-2xl border border-[#34373b] bg-[#1d1d1d] p-6 shadow-lg">
          {(formError || error) && (
            <p className="rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-sm font-medium text-red-400">
              {formError || error}
            </p>
          )}

          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <h2 className="text-lg font-semibold text-gray-200">Profile details</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-gray-400">
                  Full name
                  <input className="min-h-12 rounded-lg border border-[#393c40] bg-[#1a1a1a] px-4 py-3 text-base font-medium text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" name="name" value={formData.name} onChange={handleChange} placeholder="Enter full name" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-gray-400">
                  Phone
                  <input className="min-h-12 rounded-lg border border-[#393c40] bg-[#1a1a1a] px-4 py-3 text-base font-medium text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" required />
                </label>
                <label className="grid gap-2 text-sm font-medium text-gray-400 sm:col-span-2">
                  Email address
                  <input className="min-h-12 rounded-lg border border-[#393c40] bg-[#1a1a1a] px-4 py-3 text-base font-medium text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
                </label>
              </div>
            </div>

            <div className="mt-8 border-t border-[#34373b] pt-6">
              <h2 className="text-lg font-semibold text-gray-200">Password</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-gray-400">
                  Password
                  <div className="relative">
                    <input className="min-h-12 w-full rounded-lg border border-[#393c40] bg-[#1a1a1a] px-4 py-3 pr-16 text-base font-medium text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} placeholder="Create a password" required />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-white" type="button" onClick={() => setShowPassword((shown) => !shown)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
                  </div>
                </label>
                <label className="grid gap-2 text-sm font-medium text-gray-400">
                  Confirm password
                  <div className="relative">
                    <input className="min-h-12 w-full rounded-lg border border-[#393c40] bg-[#1a1a1a] px-4 py-3 pr-16 text-base font-medium text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" required />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-white" type="button" onClick={() => setShowConfirmPassword((shown) => !shown)} aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}>{showConfirmPassword ? 'Hide' : 'Show'}</button>
                  </div>
                </label>
              </div>
            </div>

            <div className="mt-8 border-t border-[#34373b] pt-6">
              <h2 className="text-lg font-semibold text-gray-200">Account settings</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-gray-400">
                  Role
                  <select className="min-h-12 cursor-pointer rounded-lg border border-[#393c40] bg-[#1a1a1a] px-4 py-3 text-base font-medium text-gray-200 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" name="role" value={formData.role} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>
                <div className="flex flex-col justify-end">
                  <p className="mb-2 text-sm font-medium text-gray-400">Account status</p>
                  <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-[#393c40] bg-[#1a1a1a] px-4 py-3 text-gray-300">
                    <input className="h-4 w-4 cursor-pointer accent-blue-600" name="isActive" type="checkbox" checked={formData.isActive} onChange={handleChange} />
                    <span className="text-sm font-medium">Active account</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#34373b] pt-6 sm:flex-row sm:justify-end">
              <Link className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#45484d] bg-transparent px-5 py-2 font-semibold text-gray-300 transition hover:bg-[#292929]" to="/admin/users">Cancel</Link>
              <button className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={loading}>{loading ? 'Creating user...' : 'Create user'}</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default AddUser;
