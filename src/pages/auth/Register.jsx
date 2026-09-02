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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
        //Name Validation
        const trimmedName = formData.name.trim();
        if(trimmedName === ''){
            //show name is required
            setFormError('Name is required');
                return;
        }
        if(trimmedName.length < 2){
            //show name should should be greater than 2 chars

            setFormError('Name must be at least 2 characters');
            return;
        }
        if(trimmedName.length > 50){
            //show name should not be greater than 50 chars
            setFormError('Name must not exceed 50 characters');
            return;
        }

        const namePattern = /^[A-Za-z\s'-]+$/;

        if(!namePattern.test(trimmedName)){
            setFormError('Name can only contain letters, spaces, hyphens and apostrophes');
            return;            
        }

        //Email Validation
        const trimmedEmail = formData.email.trim();
        if(trimmedEmail === ''){
            setFormError('Email is required');
            return;
        }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    setFormError('Enter a valid email address');
    return;
}

        //Phone Validation

        const trimmedPhone = formData.phone.trim();

        if(trimmedPhone === ''){
            setFormError('Phone is required');
            return;
        }
        if(!/^[0-9]{10}$/.test(trimmedPhone)){
            setFormError('Phone number must be exactly 10 digits');
            return;
        }
        
        //password Validation
        if(formData.password.length < 8){
            setFormError('Password must be at least 8 characters');
            return;
        }
        if(formData.password.length > 50){
            setFormError('Password must not exceed 50 characters');
            return;
        }
        if(!/[A-Z]/.test(formData.password)){
            setFormError('Password must contain atleast one uppercase character');
            return;
        }
         if(!/[a-z]/.test(formData.password)){
            setFormError('Password must contain atleast one lowercase character');
            return;
        }
         if(!/[0-9]/.test(formData.password)){
            setFormError('Password must contain atleast one number');
            return;
        }
        if(!/[!@#$%^&*()_\-+=?/<,>.]/.test(formData.password)){
    setFormError('Password must contain at least one special character');
    return;
}
        if(/\s/.test(formData.password)){
            setFormError('Password must not contain spaces');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setFormError('Passwords do not match');
            return;
        }
  
        dispatch(
            registerUser({
                name: trimmedName,
                email: trimmedEmail,
                phone: trimmedPhone,
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

    <div className="relative">
        <input
            className="min-h-11 w-full rounded-md border border-gray-600 bg-[#1A1A19] px-3 py-2 pr-16 text-base text-white outline-none placeholder:text-gray-500 focus:border-white focus:ring-1 focus:ring-white"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
        />

        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-white"
        >
            {showPassword ? 'Hide' : 'Show'}
        </button>
    </div>
</label>

<label className="grid gap-1.5 text-left text-sm font-medium text-gray-300">
    Confirm Password

    <div className="relative">
        <input
            className="min-h-11 w-full rounded-md border border-gray-600 bg-[#1A1A19] px-3 py-2 pr-16 text-base text-white outline-none placeholder:text-gray-500 focus:border-white focus:ring-1 focus:ring-white"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
        />

        <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-white"
        >
            {showConfirmPassword ? 'Hide' : 'Show'}
        </button>
    </div>
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