import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, isAuthenticated } = useSelector((state) => state.auth);

    const linkClass = ({ isActive }) =>
        isActive ? 'font-semibold text-blue-600' : 'text-slate-600 hover:text-slate-950';

    function handleLogout() {
        dispatch(logout());
        navigate('/');
    }

    return (
        <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <Link className="font-bold text-slate-950 no-underline" to={isAuthenticated ? '/account' : '/'}>User Manager</Link>

            <nav className="flex flex-wrap items-center gap-3 text-sm">
                {isAuthenticated && currentUser?.role === 'admin' && (
                    <>
                        <NavLink className={linkClass} to="/admin">Dashboard</NavLink>
                        <NavLink className={linkClass} to="/admin/users">Users</NavLink>
                    </>
                )}

                {isAuthenticated && currentUser?.role !== 'admin' && (
                    <>
                        <NavLink className={linkClass} to="/account">Account</NavLink>
                        <NavLink className={linkClass} to="/account/edit">Edit Profile</NavLink>
                        <NavLink className={linkClass} to="/account/password">Password</NavLink>
                    </>
                )}

                {!isAuthenticated && (
                    <>
                        <NavLink className={linkClass} to="/">Login</NavLink>
                        <NavLink className={linkClass} to="/register">Register</NavLink>
                        <NavLink className={linkClass} to="/admin/login">Admin Login</NavLink>
                    </>
                )}
            </nav>

            {isAuthenticated && (
                <button className="min-h-10 rounded-md border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-900" type="button" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </header>
    );
}

export default Navbar;
