import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { changePassword } from '../../features/auth/authSlice';

function ChangePassword() {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {currentUser, loading} = useSelector(state => state.auth);

  function handleSubmit(e){
    e.preventDefault();
    setError('');
    setSuccess('');

    if(newPassword !== confirmPassword){
      setError("Passwords do not match");
      return;
    }
    if(currentPassword !== currentUser.password){
      setError('Current Password is Incorrect');
      return;
    }

    dispatch(changePassword({
      id: currentUser.id,
      password: newPassword
    }))
      .unwrap()
      .then(() => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setSuccess('Password changed successfully');
        setTimeout(() => navigate('/account'), 700);
      });
    

  }
  return (
    <main className="mx-auto w-full max-w-5xl bg-slate-50 px-4 py-8">
      <section className="mx-auto w-full max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-5 text-4xl font-bold text-slate-950">Change Password</h1>

      {error && <p className="font-semibold text-red-600">{error}</p>}
      {success && <p className="font-semibold text-emerald-700">{success}</p>}

      <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
        <input type='password'
          className="min-h-11 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2"
          placeholder='Current password'
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
          required
          />
          <input type='password'
          className="min-h-11 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2"
          placeholder='New Password'
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
          />
          <input type='password'
          className="min-h-11 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2"
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          />
          <div className="flex flex-wrap gap-3">
            <button className="min-h-10 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-60" type='submit' disabled={loading}>{loading ? 'Changing...' : 'Change Password'}</button>
            <Link className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-900" to="/account">Cancel</Link>
          </div>
      </form>
      </section>
    </main>
  )
}

export default ChangePassword
