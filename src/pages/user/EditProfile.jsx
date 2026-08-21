import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateUser } from '../../features/auth/authSlice';


function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {currentUser, loading, error} = useSelector(state => state.auth)
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [phone, setPhone] = useState(currentUser.phone || '');


   function handleSave(e){
        e.preventDefault();

        dispatch(updateUser({id: currentUser.id, name, email, phone}))
            .unwrap()
            .then(() => navigate('/account'));
    }
  return (
    <main className="mx-auto w-full max-w-5xl bg-slate-50 px-4 py-8">
      <section className="mx-auto w-full max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-5 text-4xl font-bold text-slate-950">Edit Profile</h1>
        <form className="grid gap-4" onSubmit={handleSave}>
        <label className="grid gap-1.5 text-left text-sm font-medium text-slate-950">
            Name
        <input className="min-h-11 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2" type='text' value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label className="grid gap-1.5 text-left text-sm font-medium text-slate-950">
            Email
            <input className="min-h-11 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2" type='email' value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label className="grid gap-1.5 text-left text-sm font-medium text-slate-950">
            Phone
            <input className="min-h-11 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2" type='text' value={phone} onChange={e => setPhone(e.target.value)} required />
        </label>
        {error && <p className="font-semibold text-red-600">{error}</p>}
        <div className="flex flex-wrap gap-3">
          <button className="min-h-10 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-60" type='submit' disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          <Link className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-900" to="/account">Cancel</Link>
        </div>
        </form>
      </section>
    </main>
  )
}

export default EditProfile
