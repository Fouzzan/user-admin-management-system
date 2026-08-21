import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import { fetchUserById } from '../../features/users/userSlice';

function UserDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedUser, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loader text="Loading user..." />;
  }

  if (error) {
    return <p className="p-8 font-semibold text-red-600">{error}</p>;
  }

  if (!selectedUser) {
    return <p className="p-8 text-slate-600">User not found.</p>;
  }

  return (
    <main className="mx-auto w-full max-w-5xl bg-slate-50 px-4 py-8">
      <section className="mx-auto w-full max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-5 text-4xl font-bold text-slate-950">{selectedUser.name}</h1>
        <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-x-5 gap-y-3 text-left">
          <span className="text-sm text-slate-500">Email</span>
          <strong className="break-words text-slate-950">{selectedUser.email}</strong>
          <span className="text-sm text-slate-500">Phone</span>
          <strong className="break-words text-slate-950">{selectedUser.phone || 'Not added'}</strong>
          <span className="text-sm text-slate-500">Role</span>
          <strong className="break-words text-slate-950">{selectedUser.role}</strong>
          <span className="text-sm text-slate-500">Status</span>
          <strong className="break-words text-slate-950">{selectedUser.isActive ? 'Active' : 'Inactive'}</strong>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="inline-flex min-h-10 items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white" to={`/admin/users/${selectedUser.id}/edit`}>Edit User</Link>
          <Link className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-900" to="/admin/users">Back</Link>
        </div>
      </section>
    </main>
  )
}

export default UserDetails
