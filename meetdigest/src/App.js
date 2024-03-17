import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';

function App() {
    const [user, setUser] = useState(null);

    // Function to handle successful login
    const handleLoginSuccess = (user) => {
        setUser(user); // Set the user object in state
    };

    // Function to handle sign out
    const handleSignOut = () => {
        setUser(null); // Clear the user object from state
    };

    return (
        <div className="App">
            {/* Conditionally render login or logout page */}
            {user ? (
                <LogoutPage user={user} onSignOut={handleSignOut} />
            ) : (
                <LoginPage onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}

export default App;
