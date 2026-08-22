import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

import { updateUser } from '../../features/auth/authSlice';

function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser, loading, error } = useSelector(
        (state) => state.auth
    );

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [phone, setPhone] = useState(currentUser.phone || '');
    const [profilePicture, setProfilePicture] = useState(
        currentUser.profilePicture || ''
    );

    function handleImageChange(e) {
        const file = e.target.files[0];

        if (!file) return;

        const image = new Image();

        image.onload = () => {
            const canvas = document.createElement('canvas');
            const maxSize = 300;

            let width = image.width;
            let height = image.height;

            if (width > height) {
                if (width > maxSize) {
                    height = height * (maxSize / width);
                    width = maxSize;
                }
            } else {
                if (height > maxSize) {
                    width = width * (maxSize / height);
                    height = maxSize;
                }
            }

            canvas.width = width;
            canvas.height = height;

            const context = canvas.getContext('2d');

            context.drawImage(
                image,
                0,
                0,
                width,
                height
            );

            const compressedImage = canvas.toDataURL(
                'image/jpeg',
                0.6
            );

            setProfilePicture(compressedImage);
        };

        image.src = URL.createObjectURL(file);
    }

    function handleSave(e) {
        e.preventDefault();

        dispatch(
            updateUser({
                id: currentUser.id,
                name,
                email,
                phone,
                profilePicture
            })
        )
            .unwrap()
            .then(() => navigate('/account'));
    }

    return (
        <main className="min-h-[calc(100svh-73px)] bg-black px-4 py-8">
            <section className="mx-auto w-full max-w-xl rounded-2xl border border-gray-700 bg-[#1A1A19] p-6 shadow-xl sm:p-8">

                {/* Header */}
                <h1 className="text-3xl font-bold text-white sm:text-4xl">
                    Edit Profile
                </h1>

                <p className="mt-2 text-gray-400">
                    Update your personal information and profile picture.
                </p>

                <form
                    className="mt-6 grid gap-5"
                    onSubmit={handleSave}
                >

                    {/* Profile Picture */}
                    <div className="flex flex-col items-center gap-4 rounded-xl border border-gray-700 bg-[#222221] p-5">

                        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-gray-600 bg-gray-800 text-4xl font-bold text-white">

                            {profilePicture ? (
                                <img
                                    src={profilePicture}
                                    alt="Profile preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                name?.charAt(0).toUpperCase()
                            )}

                        </div>

                        <label className="cursor-pointer rounded-full border border-gray-600 px-5 py-2 text-sm font-semibold text-gray-300 transition hover:border-gray-400 hover:bg-gray-800 hover:text-white">

                            Change Photo

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                        </label>

                        <p className="text-center text-xs text-gray-500">
                            Upload a profile image. Images are automatically compressed.
                        </p>

                    </div>

                    {/* Name */}
                    <label className="grid gap-1.5 text-left text-sm font-medium text-gray-300">
                        Name

                        <input
                            className="min-h-11 rounded-md border border-gray-600 bg-[#1A1A19] px-3 py-2 text-base text-white outline-none placeholder:text-gray-500 focus:border-white focus:ring-1 focus:ring-white"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>

                    {/* Email */}
                    <label className="grid gap-1.5 text-left text-sm font-medium text-gray-300">
                        Email

                        <input
                            className="min-h-11 rounded-md border border-gray-600 bg-[#1A1A19] px-3 py-2 text-base text-white outline-none placeholder:text-gray-500 focus:border-white focus:ring-1 focus:ring-white"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    {/* Phone */}
                    <label className="grid gap-1.5 text-left text-sm font-medium text-gray-300">
                        Phone

                        <input
                            className="min-h-11 rounded-md border border-gray-600 bg-[#1A1A19] px-3 py-2 text-base text-white outline-none placeholder:text-gray-500 focus:border-white focus:ring-1 focus:ring-white"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </label>

                    {/* Error */}
                    {error && (
                        <p className="rounded-md border border-red-900 bg-red-950/40 px-4 py-3 text-sm font-medium text-red-400">
                            {error}
                        </p>
                    )}

                    {/* Actions */}
                    <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-center">

                        <button
                            className="min-h-11 rounded-full bg-white px-6 py-2 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
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
export default EditProfile;