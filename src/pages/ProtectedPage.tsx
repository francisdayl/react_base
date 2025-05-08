import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../lib/hooks';
import PortalLayout from '../layouts/PortalLayout';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PortalLayout>
      <Outlet />
    </PortalLayout>
  );
}
