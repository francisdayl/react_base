import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { AppDispatch } from '@/store/index.ts';
import { useDispatch } from 'react-redux';
import { getToken as getTokenAction } from '@/store/authSlice.tsx';

import PortalLayout from '../layouts/PortalLayout';
import { useEffect } from 'react';

export default function ProtectedRoute() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getTokenAction());
  }, [dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PortalLayout>
      <Outlet />
    </PortalLayout>
  );
}
