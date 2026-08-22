import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    const linkClass = ({ isActive }) =>
        `relative flex items-center px-1 py-6 text-sm font-medium transition-colors
        ${
            isActive
                ? 'text-blue-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-400'
                : 'text-gray-400 hover:text-gray-200'
        }`;

    function handleLogout() {
        dispatch(logout());
        navigate('/');
    }

    return (
        <header className="border-b border-[#2f3033] bg-[#1b1c1e] text-white">
            <div className="mx-auto flex min-h-[72px] max-w-7xl items-center gap-6 px-6">

                {/* Logo */}
                <Link
                    className="flex shrink-0 items-center gap-3 text-lg font-bold text-white no-underline"
                    to={isAuthenticated ? '/account' : '/'}
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-sm text-black">
                        ◉
                    </div>

                    <span>User Manager</span>
                </Link>

                {/* Navigation */}
                <nav className="flex flex-1 items-center gap-7 self-stretch">

                    {/* Admin Navigation */}
                    {isAuthenticated && currentUser?.role === 'admin' && (
                        <>
                            <NavLink className={linkClass} to="/admin">
                                Dashboard
                            </NavLink>

                            <NavLink
                                className={linkClass}
                                to="/admin/users"
                            >
                                Users
                            </NavLink>
                        </>
                    )}

                    {/* Normal User Navigation */}
                    {isAuthenticated && currentUser?.role !== 'admin' && (
                        <>
                            <NavLink className={linkClass} to="/account">
                                Account
                            </NavLink>

                            <NavLink
                                className={linkClass}
                                to="/account/edit"
                            >
                                Edit Profile
                            </NavLink>

                            <NavLink
                                className={linkClass}
                                to="/account/password"
                            >
                                Password
                            </NavLink>
                        </>
                    )}

                    {/* Guest Navigation */}
                    {!isAuthenticated && (
                        <>
                            <NavLink className={linkClass} to="/">
                                Login
                            </NavLink>

                            <NavLink
                                className={linkClass}
                                to="/register"
                            >
                                Register
                            </NavLink>

                            <NavLink
                                className={linkClass}
                                to="/admin/login"
                            >
                                Admin Login
                            </NavLink>
                        </>
                    )}
                </nav>

                {/* Right Side */}
                {isAuthenticated && (
                    <div className="flex items-center gap-3">

                        {/* User avatar */}
                        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-blue-950 text-sm font-semibold text-blue-300">
                            {currentUser?.profilePicture ? (
                                <img
                                    src={currentUser.profilePicture}
                                    alt={currentUser.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                currentUser?.name
                                    ?.charAt(0)
                                    .toUpperCase()
                            )}
                        </div>

                        {/* Logout */}
                        <button
                            className="rounded-lg border border-[#3a3c40] px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
                            type="button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                )}

            </div>
        </header>
    );
}

export default Navbar;