import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/portal" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/portal" replace />;
  }

  return children;
};

export default PrivateRoute;
