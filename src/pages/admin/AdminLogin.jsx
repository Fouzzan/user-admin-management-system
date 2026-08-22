import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

import { loginUser, logout } from '../../features/auth/authSlice';

function AdminLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser, isAuthenticated, loading, error } = useSelector(
        (state) => state.auth
    );

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

                    setAdminError(
                        'Only administrator accounts can access the admin panel.'
                    );

                    return;
                }

                navigate('/admin');
            })
            .catch(() => {
                // Redux error is already displayed below
            });
    }

    return (
        <main className="grid min-h-[calc(100svh-73px)] place-items-center bg-[#181818] px-4 py-8">
            <section className="w-full max-w-md rounded-2xl border border-[#303030] bg-[#202020] p-6 shadow-xl shadow-black/20 sm:p-8">

                {/* Admin badge */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl font-bold text-blue-400">
                    A
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold tracking-tight text-slate-100">
                    Admin login
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                    Sign in with an administrator account to manage users and
                    access the admin dashboard.
                </p>

                {/* Form */}
                <form
                    className="mt-7 grid gap-5"
                    onSubmit={handleSubmit}
                >
                    <label className="grid gap-2 text-left text-sm font-medium text-slate-300">
                        Email

                        <input
                            className="min-h-11 rounded-lg border border-[#383838] bg-[#181818] px-3 py-2 text-base text-slate-100 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            type="email"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />
                    </label>

                    <label className="grid gap-2 text-left text-sm font-medium text-slate-300">
                        Password

                        <input
                            className="min-h-11 rounded-lg border border-[#383838] bg-[#181818] px-3 py-2 text-base text-slate-100 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />
                    </label>

                    {/* Error */}
                    {(adminError || error) && (
                        <p className="rounded-lg border border-red-900/50 bg-red-950/30 px-3 py-2 text-sm font-medium text-red-400">
                            {adminError || error}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        className="min-h-11 rounded-lg bg-slate-100 px-4 py-2.5 font-semibold text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Checking credentials...' : 'Login as Admin'}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 border-t border-[#303030] pt-5">
                    <p className="text-sm text-slate-500">
                        Looking for the regular user login?{' '}
                        <Link
                            className="font-semibold text-blue-400 transition hover:text-blue-300"
                            to="/"
                        >
                            Go to login
                        </Link>
                    </p>
                </div>

            </section>
        </main>
    );
}

export default AdminLogin;