import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, logout } from '../../features/auth/authSlice';

function AdminLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, isAuthenticated, loading, error } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminError, setAdminError] = useState('');

    useEffect(() => {
        if (isAuthenticated && currentUser?.role === 'admin') {
            navigate('/admin');
        }
    }, [isAuthenticated, currentUser, navigate]);

    function handleSubmit(event) {
        event.preventDefault();
        setAdminError('');

        dispatch(loginUser({ email, password }))
            .unwrap()
            .then((user) => {
                if (user.role !== 'admin') {
                    dispatch(logout());
                    setAdminError('Only admins can access this page');
                    return;
                }

                navigate('/admin');
            });
    }

    return (
        <main className="grid min-h-[calc(100svh-73px)] place-items-center bg-slate-50 px-4 py-8">
            <section className="w-full max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="mb-2 text-4xl font-bold text-slate-950">Admin Login</h1>
                <p className="text-slate-600">Use an admin account to manage users.</p>

                <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
                    <label className="grid gap-1.5 text-left text-sm font-medium text-slate-950">
                        Email
                        <input className="min-h-11 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                    </label>
                    <label className="grid gap-1.5 text-left text-sm font-medium text-slate-950">
                        Password
                        <input className="min-h-11 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                    </label>

                    {(adminError || error) && <p className="font-semibold text-red-600">{adminError || error}</p>}

                    <button className="min-h-11 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-60" type="submit" disabled={loading}>
                        {loading ? 'Checking...' : 'Login as Admin'}
                    </button>
                </form>

                <p className="mt-5 text-slate-600">
                    User login is at <Link className="font-semibold text-blue-600" to="/">Login</Link>
                </p>
            </section>
        </main>
    );
}

export default AdminLogin
