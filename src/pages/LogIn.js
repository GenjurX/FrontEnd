import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogIn(){
    const [error,setError] = React.useState(null);
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
         
          navigate('/Trips')
          console.log(data);
          
          // setUser(data);
      }
      else {
        
          setError(data);
      }
    };
      return (
        <div className="app-title">
          <form id="login" onSubmit={onSubmit}>
          <h1>Login</h1>
          {/* <h2>Please enter your username and password to log in!</h2> */}
          <label htmlFor="email">Email*:</label>
          <input type="email" id="email" name="email" placeholder="Choose your email..." required/>
          <label htmlFor='password' >Password:</label>
          <input type="password" id="password" name="password" placeholder="Choose your password..." required/>
          <p>You're not a user yet?<a href="sign-up">Sign up</a></p>
          <button type="submit" name="submit">Enter</button>
          {error?<p>Invalid username or password </p>:null}
          </form>
        </div>
      );
      
  }