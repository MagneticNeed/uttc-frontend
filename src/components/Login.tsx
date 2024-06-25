import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { UserType } from './UserType';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const Login: React.FC<{ onLogin: (user: UserType) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData: UserType = {
        id: user.uid,
        email: user.email || '',
        username: user.displayName || ''
      };
      const response = await axios.get(`${API_URL}/users/${email}`);

      // ユーザー情報を sessionStorage に保存
      sessionStorage.setItem('userData', JSON.stringify(response.data));

      onLogin(userData);
      console.log('User logged in:', userData);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
};

export default Login;
