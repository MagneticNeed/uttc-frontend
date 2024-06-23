import React, { useState } from 'react';
import axios from 'axios';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

const API_URL = process.env.REACT_APP_API_URL;

interface SignUpProps {
  onSignUp: (user: { email: string; username: string }) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with username
      await updateProfile(user, { displayName: username });

      // Send user information to the backend
      await axios.post(`${API_URL}/users`, {
        username,
        email,
        password,
      });

      //バックエンドからユーザー情報を取得し、sessionStorageでユーザー情報をセットする
      const response = await axios.get(`${API_URL}/users/${email}`);

      sessionStorage.setItem('userData', JSON.stringify(response.data));

      onSignUp({ email, username });
      console.log('User signed up:', user);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default SignUp;
