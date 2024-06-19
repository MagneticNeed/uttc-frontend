import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Logout: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Log Out</button>
  );
};

export default Logout;
