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
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser, loading } = useSelector(
        (state) => state.auth
    );

    function handleSubmit(e) {
        e.preventDefault();

        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (currentPassword !== currentUser.password) {
            setError('Current password is incorrect');
            return;
        }

        dispatch(
            changePassword({
                id: currentUser.id,
                password: newPassword
            })
        )
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
        <main className="min-h-[calc(100svh-73px)] bg-black px-4 py-8">
            <section className="mx-auto w-full max-w-xl rounded-2xl border border-gray-700 bg-[#1A1A19] p-6 shadow-xl sm:p-8">

                <h1 className="text-3xl font-bold text-white sm:text-4xl">
                    Change Password
                </h1>

                <p className="mt-2 text-gray-400">
                    Update your account password securely.
                </p>

                {error && (
                    <p className="mt-5 rounded-md border border-red-900 bg-red-950/40 px-4 py-3 text-sm font-medium text-red-400">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="mt-5 rounded-md border border-emerald-900 bg-emerald-950/40 px-4 py-3 text-sm font-medium text-emerald-400">
                        {success}
                    </p>
                )}

                <form
                    className="mt-6 grid gap-4"
                    onSubmit={handleSubmit}
                >
                    <label className="grid gap-1.5 text-left text-sm font-medium text-gray-300">
                        Current Password
                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="min-h-11 w-full rounded-md border border-gray-600 bg-[#1A1A19] px-3 py-2 text-base text-white outline-none placeholder:text-gray-500 focus:border-white focus:ring-1 focus:ring-white"
                            placeholder="Enter current password"
                            value={currentPassword}
                            onChange={(e) =>
                                setCurrentPassword(e.target.value)
                            }
                            required
                        />

                        <button 
                         type='button'
                         onClick={() => setShowPassword(!showPassword)}
                         className='absolute right-3 top-3.5 -translate-y-0.5 text-sm text-gray-400 hover:text-white '
                         >{showPassword ? 'Show' : 'Hide' }</button>
                    </div>
                        
                    </label>

                    <label className="grid gap-1.5 text-left text-sm font-medium text-gray-300">
                        New Password
                        
                        <div className='relative'>
                            <input
                            type="password"
                            className="min-h-11 w-full rounded-md border border-gray-600 bg-[#1A1A19] px-3 py-2 text-base text-white outline-none placeholder:text-gray-500 focus:border-white focus:ring-1 focus:ring-white"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            required
                        />
                             <button 
                         type='button'
                         onClick={() => setShowPassword(!showPassword)}
                         className='absolute right-3 top-3.5 -translate-y-0.5 text-sm text-gray-400 hover:text-white '
                         >{showPassword ? 'Show' : 'Hide' }</button>

                        

                        </div>
                        
                    </label>

                    <label className="grid gap-1.5 text-left text-sm font-medium text-gray-300">
                        Confirm Password

                        <input
                            type="password"
                            className="min-h-11 rounded-md border border-gray-600 bg-[#1A1A19] px-3 py-2 text-base text-white outline-none placeholder:text-gray-500 focus:border-white focus:ring-1 focus:ring-white"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            required
                        />
                    </label>

                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <button
                            className="min-h-11 w rounded-full bg-white px-6 py-2 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? 'Changing...'
                                : 'Change Password'}
                        </button>

                        <Link
                            className="inline-flex min-h-11 items-center justify-center rounded-full border border-gray-600 px-6 py-2 font-semibold text-gray-300 transition hover:border-gray-400 hover:bg-gray-800 hover:text-white"
                            to="/account"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>

            </section>
        </main>
    );
}

export default ChangePassword;