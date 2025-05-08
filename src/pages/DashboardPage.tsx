import { useAuth } from '../lib/hooks';

export default function DashboardPage() {
  const { getUser } = useAuth();
  const user = getUser();
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
