import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Logout: React.FC<{ onLogout: () => void; className?: string }> = ({ onLogout, className }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // sessionstorageからユーザー情報を削除する
  sessionStorage.removeItem('userData');

  return (
    <button className={className} onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default Logout;
