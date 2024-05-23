import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Auth.css';
import icon from "../../assets/imslogo2.2.png";
import AboutAuth from './AboutAuth';
import { signup, login } from '../../actions/auth';

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showAlert = useSelector(state => state.showAlert);
    const alertMessage = useSelector(state => state.alertMessage);

    const handleSwitch = () => {
        setIsSignup(!isSignup);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Enter email and password to continue');
            return;
        }

        if (isSignup && !name) {
            alert('Enter a name to continue');
            return;
        }

        if (isSignup) {
            dispatch(signup({ name, email, password }, navigate));
            alert('Hey, Welcome ! ')
        } else {
            dispatch(login({ email, password }, navigate))                      
        }
    
    };

    return (
        <section className="auth-section">
            {isSignup && <AboutAuth />}
            <div className="auth-container-2">
                {!isSignup && <img src={icon} alt='MERN QUEST' className="login-logo" />}
                {showAlert && <div className="alert">{alertMessage}</div>}
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <label htmlFor="name">
                            <h4>Display Name</h4>
                            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                    )}
                    <label htmlFor="email">
                        <h4>Email</h4>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label htmlFor="password">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h4>Password</h4>
                            {!isSignup && <p style={{ color: "#007ac6", fontSize: "13px" }}>forgot password?</p>}
                        </div>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {isSignup && <p style={{ color: "white", fontSize: "13px" }}>Password must contain at least eight characters,<br /> including at least 1 letter and 1 number</p>}
                    </label>
                    {isSignup && (
                        <label htmlFor='check' >
                            <input type="checkbox" id="check" />
                            <p style={{ fontSize: "13px", color:"white" }}>Opt-in receive occasional product updates,<br /> user research invitations, company<br /> announcements, and designs </p>
                        </label>
                    )}
                    <button type="submit" className="auth-btn">{isSignup ? 'Sign up' : 'Log in'}</button>
                    {isSignup && (
                        <p style={{color: "white", fontSize:"13px"}}>
                            By clicking "Sign up", you agree to our
                            <span style={{ color: "#007ac6" }}> terms of <br />services</span>,
                            <span style={{ color: "#007ac6" }}> privacy policy</span> and
                            <span style={{ color: "#007ac6" }}> cookie policy</span>
                        </p>
                    )}
                </form>
                <p>
                    {isSignup ? "Already have an account" : "Don't have an account"}
                    <button type="button" className="handle-switch-btn" onClick={handleSwitch}>{isSignup ? "Log in" : "Sign up"}</button>
                </p>
            </div>
        </section>
    );
};

export default Auth ;
