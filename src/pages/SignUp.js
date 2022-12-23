import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function SignUp(){
    const [error,setError] = useState(null);
    const navigate = useNavigate()
    const onSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const email = formData.get("email");
        const password = formData.get("password");
        const values = { email, password };
        const response = await fetch('http://localhost:4000/api/sign-up', {
            method: 'POST', headers: {
                'Content-Type': 'application/json; charset=utf-8 '
            }, body: JSON.stringify(values)
        })
        const data = await response.json();
        if(response.ok) {
             window.alert("Account is created!");
             console.log(data);  
             navigate('/');
        }
        else {
             setError(data);
        }
    }

    return (
        <div>
        <Header />
        <div className="container w-75 bg-white mt-3 rounded p-5">
            <form id="sign-up" onSubmit={onSubmit} className="justify-content-center d-flex flex-column w-50 mx-auto">
                <h1 className='mx-auto fw-bold'>Sign up</h1>
                <label htmlFor="email" className=" my-2 fw-bold fs-6">Email *</label>
                <input className="p-2" type="email" id="email" name="email" placeholder="Choose your email..." minLength="5" maxLength="20"  required />
                <label htmlFor="password" className=" mt-3 mb-2 fw-bold fs-6">Password:</label>
                <input className="p-2" type="password" id="password" name="password" placeholder="Choose your password..." pattern="(?=.*\d)(?=.*[!?.:]).{5,12}" title="Must contain at least one number and one special character, and 5-12 characters"/> 
                {error?<p className="mt-3 fs-6 text-danger">{error}</p>:null}
                <p className="mt-3 fs-6">Are you already a user ? <Link to='/'>Log in</Link></p>
                <button type="submit" className="mt-4 btn btn-dark fs-6" name="submit">Create Account</button>
            </form>
        </div>
        <Footer />  
        </div>
    );      
};
export default SignUp;