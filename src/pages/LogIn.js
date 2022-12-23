import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function LogIn(){
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
    }
    else {
      setError(data);
    }
  };

  return (
    <div>
    <Header />
    <div className="container w-75 bg-white mt-3 rounded p-5">
    <form id="login" onSubmit={onSubmit} className="justify-content-center d-flex flex-column w-50 mx-auto">
      <h1 className='mx-auto fw-bold'>Login</h1>
      <label htmlFor="email" className=" my-2 fw-bold fs-6">Email *</label>
      <input type="email" id="email" name="email" placeholder="Choose your email..." required className="p-2"/>
      <label htmlFor='password' className=" mt-3 mb-2 fw-bold fs-6" >Password</label>
      <input type="password" id="password" name="password" placeholder="Choose your password..." required className="p-2"/>
      {error?<p className="mt-3 fs-6 text-danger">{error} </p>:null}
      <p className="mt-3 fs-6">You're not a user yet?<Link to="sign-up" className="fs-6"> Sign up</Link></p>
      <button type="submit" name="submit" className="mt-4 btn btn-dark fs-6">Enter</button>
    </form>
    </div>
    <Footer />
    </div>
  );      
}
export default LogIn;