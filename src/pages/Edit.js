import React from 'react';
import { useState} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


export const Edit = () => {
    
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [successEmail, setSuccessEmail] = useState('');
    const [successPassword, setSuccesPassword] = useState('');
    const id = localStorage.getItem('user_id');
    const passwordLogedin = localStorage.getItem('password');

    const updateEmail = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const email = formData.get("email");
        const value = {email};
        try {
            const response = await fetch(`http://localhost:4000/api/email/${id}`, {
                method:'PUT', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(value)
            })

       const data = await response.json();
        if (response.OK) {
            setSuccessEmail(data);
            }
        else {
            setErrorEmail(data);
          } 
        }
        catch (err) {
            setErrorEmail( err.message );
        }

    }
      
       const updatePassword = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const currentPassword = formData.get("currentPassword");
        const password = formData.get("newPassword");
        const value = {password};
        try {
            if (currentPassword === passwordLogedin) {
            const response = await fetch(`http://localhost:4000/api/password/${id}`, {
                method:'PUT', headers: {
                    'Content-Type': 'application/json'
                },body: JSON.stringify(value)
            })
             const data = await response.json();
             if (response.OK) {
               console.log(data);
               setSuccesPassword(data);
             }
             else {
               console.log(data);
               setErrorPassword(data);
             }
           } 
           else {
            setErrorPassword(`This is not your current password. Please try again!`);
           }
        }
        catch (err) {
            setErrorPassword(err.message);
        }
    }

 

  return (

    <div>
       <Navbar />
        <div className='my-3 mx-auto p-3 ml-5 d-flex flex-column container w-75 bg-white rounded'>
          <h2>Personal information</h2>
          <form onSubmit={updateEmail} className='my-2 d-flex flex-column' >
            <label className='my-2'>Email</label>
            <input type='text' name='email' placeholder='john.doe@gmail.com' className='border w-72 p-2'/>
            <div className='text-right'>
            <button type='submit' className='btn btn-secondary w-20 mt-2'>Save</button>
            </div>
          </form>
        </div>
        <div className="mx-auto p-3 ml-5 d-flex flex-column container w-75 bg-white rounded">
          <h2>Security</h2>
          <h3>Password</h3>
          <form onSubmit={updatePassword} className='my-2 d-flex flex-column'>
            <div className='d-flex'>
              <div className='d-flex flex-column'>
               <label className='font-bold mb-2'>Current password</label>
               <input type='text' name='currentPassword' placeholder='Insert current password' className='border w-72 p-2'/>
              </div>
              <div className='d-flex flex-column ml-10'>
               <label className='font-bold mb-2'>New Password</label>
               <input type='text' name='newPassword' placeholder='Insert new password' className='border w-72 p-2'/>
              </div>
            </div>
            <div className='text-right'>
            <button type='submit' className='btn btn-secondary w-20 mt-2'>Save</button>
            </div>
          </form>
        </div>
        <div className='bg-white my-1 text-center w-3/4 mx-auto'>
        {(successEmail) ? <p className='text-success'>You have successfully changed your email to: {successEmail}</p> : <p className='text-danger'>{errorEmail}</p> }
        {(successPassword) ?<p className='text-success'>You have successfully changed your password to: {successPassword}</p> : <p className='text-danger'>{errorPassword}</p>}
        </div>
        <Footer />
    </div>

  )
}

export default Edit;
