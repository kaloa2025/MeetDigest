import React from 'react';
import { jwtDecode } from 'jwt-decode';
import logo from '../images/google.png';
import './login.css';

export default function LoginPage({ onLoginSuccess }) {
    function handleCallbackResponse(response) {
        if (response && response.credential) {
            console.log("Encoded JWT : " + response.credential);
            const userObject = jwtDecode(response.credential);
            console.log(userObject);
            onLoginSuccess(userObject); // Notify parent component of successful login
        } else {
            console.error("Invalid response or missing credential property");
        }
    }

    function handleSignInButtonClick() {
        /* global google */
        google.accounts.id.initialize({
            client_id: "218735515336-mdsgti43pd1rt676bou31frsvg344mba.apps.googleusercontent.com",
            callback: handleCallbackResponse, // Pass the callback function directly
        });
        google.accounts.id.prompt();
    }

    return (
        <div className="login-container">
            <img src={logo} alt="Logo"  className='company-logo'/>
            <button onClick={handleSignInButtonClick} className="sign-in-button">Sign In with Google</button>
        </div>
    );
}
