import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

import { loginUser } from '../../features/auth/authSlice';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const {
        currentUser,
        isAuthenticated,
        error,
        loading
    } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && currentUser) {
            navigate(
                currentUser.role === 'admin'
                    ? '/admin'
                    : '/account'
            );
        }
    }, [isAuthenticated, currentUser, navigate]);

    function handleLogin(event) {
        event.preventDefault();

        dispatch(loginUser({ email, password }))
            .unwrap()
            .catch(() => {
                // Error is handled by Redux state
            });
    }

    return (
        <main className="grid min-h-[calc(100svh-73px)] place-items-center bg-[#181818] px-4 py-8">
            <section className="w-full max-w-md rounded-2xl border border-[#303030] bg-[#202020] p-6 shadow-xl shadow-black/20 sm:p-8">

                {/* Icon */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl font-bold text-blue-400">
                    U
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold tracking-tight text-slate-100">
                    Welcome back
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                    Sign in with your registered email and password.
                </p>

                <form
                    className="mt-7 grid gap-5"
                    onSubmit={handleLogin}
                >
                    {/* Email */}
                    <label className="grid gap-2 text-left text-sm font-medium text-slate-300">
                        Email

                        <input
                            className="min-h-11 rounded-lg border border-[#383838] bg-[#181818] px-3 py-2 text-base text-slate-100 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />
                    </label>

                    {/* Password */}
                    <label className="grid gap-2 text-left text-sm font-medium text-slate-300">
                        Password

                        <div className='relative'>
                            <input
                            className="min-h-11 w-full rounded-lg border border-[#383838] bg-[#181818] px-3 py-2 text-base text-slate-100 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />

                       <button
                            type='button'
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-white">
                                {showPassword ? 'Hide' : 'Show'}
                            </button>

                        </div>
                        
                    </label>

                    {/* Error */}
                    {error && (
                        <p className="rounded-lg border border-red-900/50 bg-red-950/30 px-3 py-2 text-sm font-medium text-red-400">
                            {error}
                        </p>
                    )}

                    {/* Login Button */}
                    <button
                        className="min-h-11 w-full rounded-lg bg-slate-100 px-4 py-2.5 font-semibold text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 border-t border-[#303030] pt-5">
                    <p className="text-sm text-slate-500">
                        New here?{' '}
                        <Link
                            className="font-semibold text-blue-400 transition hover:text-blue-300"
                            to="/register"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>

            </section>
        </main>
    );
}

export default Login;