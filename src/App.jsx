import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { initializeAuth, restoreUser } from './features/auth/authSlice';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import EditUser from './pages/admin/EditUser';
import UserDetails from './pages/admin/UserDetails';
import Users from './pages/admin/Users';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Account from './pages/user/Account';
import EditProfile from './pages/user/EditProfile';
import ChangePassword from './pages/user/ChangePassword';

function App() {

  
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch(restoreUser(user));
      } catch {
        localStorage.removeItem('user');
        dispatch(initializeAuth());
      }
    } else {
        dispatch(initializeAuth());
    }
}, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/account' element={
          <ProtectedRoute>
          <Account />
          </ProtectedRoute>
          } />
        <Route path='/admin' element={
          <AdminRoute>
          <Dashboard />
          </AdminRoute>} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/users' element={
          <AdminRoute>
          <Users />
          </AdminRoute>} />
        <Route path='/admin/users/:id' element={
          <AdminRoute>
          <UserDetails />
          </AdminRoute>} />
        <Route path='/admin/users/:id/edit' element={
          <AdminRoute>
          <EditUser />
          </AdminRoute>} />
        <Route path='/account/edit' 
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
        />
        <Route path='/account/password'
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        } />
      </Routes>
     
    </>
  )
}

export default App
