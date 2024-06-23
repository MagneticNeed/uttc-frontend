import React, { useState, useEffect } from 'react';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import Search from './components/Search';
import User from './components/Profile';
import PostForm from './components/PostForm';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';

interface User {
  email: string;
  username: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isPostPopupOpen, setPostPopupOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Fetch additional user info (e.g., username) from backend if needed
        // Here, we assume that the username is already stored in user.displayName
        setUser({ email: user.email || '', username: user.displayName || '' });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'search':
        return <Search />;
      case 'user':
        return <User />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Twitter2</h1>
        {user && <Logout onLogout={() => setUser(null)} className="logout-button" />}
      </header>
      <main className={!user ? "login-signup-container" : ""}>
        {!user ? (
          <div className="login-signup-container">
            <SignUp onSignUp={(user) => setUser(user)} />
            <Login onLogin={(user) => setUser(user)} />
          </div>
        ) : (
          <>
            {renderContent()}
            {user && <p>Logged in as: {user.email}</p>}
          </>
        )}
      </main>
      {user && (
        <footer className="App-footer">
          <button
            className={activeTab === 'home' ? 'active' : 'inactive'}
            onClick={() => setActiveTab('home')}
          >
            Home
          </button>
          <button
            className={activeTab === 'search' ? 'active' : 'inactive'}
            onClick={() => setActiveTab('search')}
          >
            Search
          </button>
          <button
            className={activeTab === 'user' ? 'active' : 'inactive'}
            onClick={() => setActiveTab('user')}
          >
            User
          </button>
          {user && (
            <button className="post-button" onClick={() => setPostPopupOpen(true)}>
              New Post
            </button>
          )}
        </footer>
      )}
      {isPostPopupOpen && user && (
        <div className="post-popup">
          <div className="post-popup-content">
            <button className="close-button" onClick={() => setPostPopupOpen(false)}>×</button>
            <PostForm onPost={() => setPostPopupOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
