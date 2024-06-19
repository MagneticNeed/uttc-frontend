import React, { useState } from 'react';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';
import './App.css';

const App: React.FC = () => {
  const [user, setUser] = useState<null | string>(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Firebase Auth with React and TypeScript</h1>
        {!user && (
          <>
            <SignUp />
            <Login onLogin={(email) => setUser(email)} />
          </>
        )}
        {user && <Logout onLogout={() => setUser(null)} />}
        {user ? <p>Logged in as: {user}</p> : <p>Not logged in</p>}
      </header>
    </div>
  );
}

export default App;
