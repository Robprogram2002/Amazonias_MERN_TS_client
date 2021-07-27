import { useContext } from 'react';
import { authContext } from '../context/AuthContext';

export default function Home() {
  const { user, authenticated } = useContext(authContext);
  return (
    <div>
      <h1>Welcome to Home page</h1>
      <p>{authenticated && JSON.stringify(user)}</p>
    </div>
  );
}
