import { Navigate, Outlet } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import useAuthStatus from '../../hooks/useAuthStatus';

const ProtectedRoute = () => {
  const { user, loading } = useAuthStatus();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin">
          <Logo width="150px" height="150px" />
        </div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
