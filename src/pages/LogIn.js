import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LogIn(){
    const [error,setError] = useState(null);
    const navigate = useNavigate()
    const onSubmit = async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const email = formData.get("email");
      const password = formData.get("password");
      const values = { email, password };
    
      const response = await fetch('http://localhost:4000/api/sign-in', {
          method: 'POST', headers: {
              'Content-Type': 'application/json; charset=utf-8 '
          }, body: JSON.stringify(values)
      })
      const data = await response.json();
      if(response.ok) {
          const user_id = data.id;
          window.localStorage.setItem("user_id", user_id);
          window.localStorage.setItem("password", password);
         
          navigate('/trips')
          console.log(data);
          
          // setUser(data);
      }
      else {
        
          setError(data);
      }
    };
      return (
        <div className="app-trips">
            <nav>
              <h3>My trips <span>diary</span></h3>
            </nav>
            <div className='form'>
              <form id="sign-in" onSubmit={onSubmit}>
                <h1>Login</h1>
                  <div className = 'container-input'>
                    <label htmlFor="email">Email*:</label>
                    <input type="email" id="email" name="email" placeholder="Choose your email..." minLength="5" maxLength="20"  required />
                  </div>
                  <div className='container-input'>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Choose your password..." required /> 
                  </div>
                  {error?<p>{error}</p>:null}
                  <p>Are you already a user ? <a href='/sign-up'>Sign up</a></p>
                  <button type="submit" className="button_submit" name="submit">Enter</button>
              </form>
            </div>
            <footer>
              <h2><span>My trips</span> diary</h2>
            </footer>
        </div>
      );
      
  }