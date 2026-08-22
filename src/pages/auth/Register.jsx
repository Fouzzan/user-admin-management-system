import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/auth/authSlice';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser, isAuthenticated, loading, error } =
        useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (isAuthenticated && currentUser) {
            navigate(
                currentUser.role === 'admin'
                    ? '/admin'
                    : '/account'
            );
        }
    }, [isAuthenticated, currentUser, navigate]);

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        setFormError('');

        if (formData.password !== formData.confirmPassword) {
            setFormError('Passwords do not match');
            return;
        }

        dispatch(
            registerUser({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            })
        );
    }

    return (
        <main className="grid min-h-[calc(100svh-73px)] place-items-center bg-black px-4 py-8">
            <section className="w-full max-w-xl rounded-2xl border border-gray-700 bg-[#1A1A19] p-6 shadow-xl sm:p-8">
                
                <h1 className="mb-2 text-4xl font-bold text-white">
                    Create Account
                </h1>

                <p className="text-gray-400">
                    Create your account to get started.
                </p>

                <form
                    className="mt-6 grid gap-4"
                    onSubmit={handleSubmit}
                >
                    <label className="grid gap-1.5 text-left text-sm font-medium text-gray-300">
                        Name

                        <input
                            className="min-h-11 rounded-md border border-gray-600 bg-[#1A1A19] px-3 py-2 text-base text-white outline-none placeholder:text-gray-500 focus:border-white focus:ring-1 focus:ring-white"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label className="grid gap-1.5 text-left text-sm font-medium text-gray-300">
                        Email

                        <input
                            className="min-h-11 rounded-md border border-gray-600 bg-[#1A1A19] px-3 py-2 text-base text-white outline-none placeholder:text-gray-500 focus:border-white focus:ring-1 focus:ring-white"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label className="grid gap-1.5 text-left text-sm font-medium text-gray-300">
                        Phone

                        <input
                            className="min-h-11 rounded-md border border-gray-600 bg-[#1A1A19] px-3 py-2 text-base text-white outline-none placeholder:text-gray-500 focus:border-white focus:ring-1 focus:ring-white"
                            name="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label className="grid gap-1.5 text-left text-sm font-medium text-gray-300">
                        Password

                        <input
                            className="min-h-11 rounded-md border border-gray-600 bg-[#1A1A19] px-3 py-2 text-base text-white outline-none placeholder:text-gray-500 focus:border-white focus:ring-1 focus:ring-white"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label className="grid gap-1.5 text-left text-sm font-medium text-gray-300">
                        Confirm Password

                        <input
                            className="min-h-11 rounded-md border border-gray-600 bg-[#1A1A19] px-3 py-2 text-base text-white outline-none placeholder:text-gray-500 focus:border-white focus:ring-1 focus:ring-white"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    {(formError || error) && (
                        <p className="rounded-md border border-red-900 bg-red-950/40 px-3 py-2 text-sm font-medium text-red-400">
                            {formError || error}
                        </p>
                    )}

                    <button
                        className="mx-auto mt-2 min-h-11 w-50 rounded-full bg-white px-4 py-2 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Already registered?{' '}
                    <Link
                        className="font-semibold text-blue-400 hover:text-blue-300"
                        to="/"
                    >
                        Login
                    </Link>
                </p>
            </section>
        </main>
    );
}

export default Register;