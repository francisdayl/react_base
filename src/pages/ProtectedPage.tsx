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
  console.log('ProtectedRoute: isAuthenticated:', isAuthenticated);
  return (
    <PortalLayout>
      <Outlet />
    </PortalLayout>
  );
}
