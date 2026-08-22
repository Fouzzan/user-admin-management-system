import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Account() {
    const { currentUser } = useSelector((state) => state.auth);

    return (
        <main className="min-h-[calc(100svh-73px)] bg-black px-4 py-8">
            <section className="mx-auto w-full max-w-2xl rounded-2xl border border-gray-700 bg-[#1A1A19] p-6 shadow-xl sm:p-8">

                <h1 className="mb-8 text-3xl font-bold text-white sm:text-4xl">
                    My Account
                </h1>

                <div className="flex flex-col items-center">

                    {/* Profile Picture */}
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-600 bg-gray-800 text-4xl font-bold text-white">
                        {currentUser.profilePicture ? (
                            <img
                                src={currentUser.profilePicture}
                                alt={currentUser.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            currentUser.name?.charAt(0).toUpperCase()
                        )}
                    </div>

                    {/* User Name */}
                    <h2 className="mt-4 text-3xl font-bold text-white">
                        {currentUser.name}
                    </h2>

                    {/* Role Badge */}
                    <span className="mt-2 rounded-full border border-gray-600 bg-gray-800 px-3 py-1 text-sm font-medium capitalize text-gray-300">
                        {currentUser.role}
                    </span>

                    {/* User Information */}
                    <div className="mt-8 w-full overflow-hidden rounded-xl border border-gray-700">

                        <div className="grid grid-cols-1 border-b border-gray-700 sm:grid-cols-[140px_1fr]">
                            <span className="bg-[#222221] px-4 py-4 text-sm font-medium text-gray-400">
                                Email
                            </span>

                            <strong className="break-words px-4 py-4 font-medium text-white">
                                {currentUser.email}
                            </strong>
                        </div>

                        <div className="grid grid-cols-1 border-b border-gray-700 sm:grid-cols-[140px_1fr]">
                            <span className="bg-[#222221] px-4 py-4 text-sm font-medium text-gray-400">
                                Phone
                            </span>

                            <strong className="break-words px-4 py-4 font-medium text-white">
                                {currentUser.phone || "Not added"}
                            </strong>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr]">
                            <span className="bg-[#222221] px-4 py-4 text-sm font-medium text-gray-400">
                                Role
                            </span>

                            <strong className="break-words px-4 py-4 font-medium capitalize text-white">
                                {currentUser.role}
                            </strong>
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">

                        <Link
                            className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-2 font-semibold text-black transition hover:bg-gray-200"
                            to="/account/edit"
                        >
                            Edit Profile
                        </Link>

                        <Link
                            className="inline-flex min-h-11 items-center justify-center rounded-full border border-gray-600 px-6 py-2 font-semibold text-gray-300 transition hover:border-gray-400 hover:bg-gray-800 hover:text-white"
                            to="/account/password"
                        >
                            Change Password
                        </Link>

                    </div>

                </div>
            </section>
        </main>
    );
}

export default Account;