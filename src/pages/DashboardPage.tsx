import { useSelector } from 'react-redux';
import { RootState } from '@/store/index.ts';

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-page">
      <h1>
        Hi <strong data-testid="user-mail">{user.email}</strong>
      </h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
}
