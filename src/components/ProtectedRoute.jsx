import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from './Loader';

function ProtectedRoute({ children, adminOnly = false }) {

    const {
        isAuthenticated,
        currentUser,
        authInitialized
    } = useSelector(state => state.auth);

    if (!authInitialized) {
        return <Loader />;
    }

    if (!isAuthenticated || !currentUser) {
        return <Navigate to={adminOnly ? '/admin/login' : '/'} replace />;
    }

    if (adminOnly && currentUser.role !== 'admin') {
        return <Navigate to="/account" replace />;
    }

    return children;
}

export default ProtectedRoute;
