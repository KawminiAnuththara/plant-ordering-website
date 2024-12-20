import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { SignIn, useSignIn } from '@clerk/clerk-react'; // Import useSignIn
import './Sign.css';

const Sign = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { signIn } = useSignIn(); // Initialize useSignIn

  // Handle successful sign-in
  const handleSignInSuccess = async () => {
    try {
      // Assuming signIn method returns a promise and resolves on success
      await signIn(); // Sign in
      navigate('/home'); // Navigate to the Home page
    } catch (error) {
      console.error('Sign-in failed:', error);
      // Handle sign-in errors here
    }
  };

  return (
    <div >
      <div className="sign">
      <SignIn afterSignInUrl="/home" className="signin" />
      </div>
      
    </div>
  );
};

export default Sign;
