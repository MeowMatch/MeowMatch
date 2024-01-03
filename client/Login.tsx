import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
// import './public/login.css';
import './login.css';

const Login: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        sessionStorage.setItem('userAuthenticated', 'true');
        history.push('/pets');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h2>
          <i className="fa fa-paw"></i> Meowmatch <i className="fa fa-paw"></i>
        </h2>
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
