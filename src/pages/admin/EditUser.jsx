import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import { fetchUserById, updateUserById } from '../../features/users/userSlice';

function EditUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUser, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    dispatch(updateUserById({
      id,
      updates: {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        role: formData.get('role'),
        isActive: formData.has('isActive')
      }
    }))
      .unwrap()
      .then(() => navigate(`/admin/users/${id}`));
  }

  if (loading && !selectedUser) {
    return <Loader text="Loading user..." />;
  }

  return (
    <main className="mx-auto w-full max-w-5xl bg-slate-50 px-4 py-8">
      <section className="mx-auto w-full max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-5 text-4xl font-bold text-slate-950">Edit User</h1>

        {error && <p className="font-semibold text-red-600">{error}</p>}

        <form className="grid gap-4" key={selectedUser?.id} onSubmit={handleSubmit}>
          <label className="grid gap-1.5 text-left text-sm font-medium text-slate-950">
            Name
            <input className="min-h-11 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2" name="name" defaultValue={selectedUser?.name || ''} required />
          </label>
          <label className="grid gap-1.5 text-left text-sm font-medium text-slate-950">
            Email
            <input className="min-h-11 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2" name="email" type="email" defaultValue={selectedUser?.email || ''} required />
          </label>
          <label className="grid gap-1.5 text-left text-sm font-medium text-slate-950">
            Phone
            <input className="min-h-11 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2" name="phone" defaultValue={selectedUser?.phone || ''} required />
          </label>
          <label className="grid gap-1.5 text-left text-sm font-medium text-slate-950">
            Role
            <select className="min-h-11 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2" name="role" defaultValue={selectedUser?.role || 'user'}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-left text-sm font-medium text-slate-950">
            <input className="h-5 w-5 rounded border-slate-300" name="isActive" type="checkbox" defaultChecked={Boolean(selectedUser?.isActive)} />
            Active account
          </label>

          <div className="flex flex-wrap gap-3">
            <button className="min-h-10 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-60" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save User'}</button>
            <Link className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-900" to="/admin/users">Cancel</Link>
          </div>
        </form>
      </section>
    </main>
  )
}

export default EditUser
