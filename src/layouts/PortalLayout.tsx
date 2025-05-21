import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { AppDispatch } from '@/store/index.ts';
import { useDispatch } from 'react-redux';

interface PortalLayoutProps {
  children?: React.ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  async function handleSignOut(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    dispatch(logout());
    navigate('/login');
  }

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/posts"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Posts
            </Link>
          </div>
          <a
            data-testid="sign-out"
            href="#"
            onClick={handleSignOut}
            className="text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            Sign out
          </a>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </>
  );
}
