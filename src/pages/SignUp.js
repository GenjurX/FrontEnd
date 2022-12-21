import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function SignUp(){
    const [error,setError] = React.useState(null);
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
        <div className="app-trips">
            <form id="sign-up" onSubmit={onSubmit}>
                <h1>Sign up</h1>
                {/* <!-- <h2>Please enter a username and a password to make the sign-up!</h2> --> */}
                <label htmlFor="email">Email*:</label>
                <input type="email" id="email" name="email" placeholder="Choose your email..." minLength="5" maxLength="20"  required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Choose your password..." pattern="(?=.*\d)(?=.*[!?.:]).{5,12}" title="Must contain at least one number and one special character, and 5-12 characters"/> 
                <p>Are you already a user ? <a href='log-in'>Login</a></p>
                <button type="submit" className="button_submit" name="submit">Create Account</button>
                {error?<p>Password is not valid, insert at least 1 number and 1 symbol (! : ; )</p>:null}
            </form>
        </div>
    );      
};