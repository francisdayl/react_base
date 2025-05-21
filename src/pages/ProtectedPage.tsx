import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { AppDispatch } from '@/store/index.ts';
import { useDispatch } from 'react-redux';
import { getToken as getTokenAction } from '@/store/authSlice.tsx';

import PortalLayout from '../layouts/PortalLayout';
import { useEffect, useState } from 'react';
export default function ProtectedRoute() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      dispatch(getTokenAction());
      setTokenChecked(true);
    };
    checkAuth();
  }, [dispatch]);

  if (!tokenChecked || isLoading) {
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
