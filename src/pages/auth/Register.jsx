import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/auth/authSlice';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, isAuthenticated, loading, error } = useSelector((state) => state.auth);
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
            navigate(currentUser.role === 'admin' ? '/admin' : '/account');
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

        dispatch(registerUser({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
        }));
    }

    return (
        <main className="grid min-h-[calc(100svh-73px)] place-items-center bg-slate-50 px-4 py-8">
            <section className="w-full max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="mb-2 text-4xl font-bold text-slate-950">Register</h1>
                <p className="text-slate-600">Create a user account.</p>

                <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
                    <label className="grid gap-1.5 text-left text-sm font-medium text-slate-950">
                        Name
                        <input className="min-h-11 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2" name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                    <label className="grid gap-1.5 text-left text-sm font-medium text-slate-950">
                        Email
                        <input className="min-h-11 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </label>
                    <label className="grid gap-1.5 text-left text-sm font-medium text-slate-950">
                        Phone
                        <input className="min-h-11 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2" name="phone" value={formData.phone} onChange={handleChange} required />
                    </label>
                    <label className="grid gap-1.5 text-left text-sm font-medium text-slate-950">
                        Password
                        <input className="min-h-11 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2" name="password" type="password" value={formData.password} onChange={handleChange} required />
                    </label>
                    <label className="grid gap-1.5 text-left text-sm font-medium text-slate-950">
                        Confirm Password
                        <input className="min-h-11 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-950 outline-blue-200 focus:border-blue-600 focus:outline-2" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
                    </label>

                    {(formError || error) && <p className="font-semibold text-red-600">{formError || error}</p>}

                    <button className="min-h-11 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-60" type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Account'}
                    </button>
                </form>

                <p className="mt-5 text-slate-600">
                    Already registered? <Link className="font-semibold text-blue-600" to="/">Login</Link>
                </p>
            </section>
        </main>
    );
}

export default Register
