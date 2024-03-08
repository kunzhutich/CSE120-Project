import React from 'react';
import './App.css';
import logo from './logo.png';

function App() {
  return (
    <div className="App">
      <img src={logo} alt="logo" className= "logo"/>
        <div className="login-block">
          <p className="email">
            Email Address
          </p>
          <input type="text" className="email-box"/>
          <p className="email">
            Password
          </p>
          <input type="password" className="email-box"/>
          <button className="sign-in">
            Sign In
          </button>
          <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
        </div>
    </div>
  );
}

export default App;