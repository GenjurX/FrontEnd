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
       console.log(data)
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
    <div className='email'>
      <h2>Personal information</h2>
      <form onSubmit={updateEmail} className='emailForm'>
        <label className=''>Email</label>
        <input type='text' name='email' placeholder='john.doe@gmail.com' className='emailInput'/>
        <div className='right'>
        <button type='submit' className='save-button1'>Save</button>
        </div>
      </form>
    </div>
    <div className='password'>
      <h2>Security </h2>
      <h5>Password</h5>
      <form onSubmit={updatePassword} className='passwordForm'>
        <div className='flex-password'>
          <div className='flex-column-password'>
           <label className='currentPass'>Current password</label> 
           <input className='currentPass' type='text' name='currentPassword' placeholder='Insert current password' />
          </div>
          <div className='flex-column-password'>
           <label>New Password</label>
           <input type='text' name='newPassword' placeholder='Insert new password' />
          </div>
        </div>
        <div className='right'>
        <button type='submit' className='save-button2' >Save</button>
        </div>
      </form>
    </div>
    <div className='text-red-center'>
    {(successEmail) ? <p>You have successfully changed your email to: {successEmail}</p> : <p>{errorEmail}</p> }
    {(successPassword) ?<p>You have successfully changed your password to: {successPassword}</p> : <p>{errorPassword}</p>}
    </div>
    <Footer />
</div>

  )
}

export default Edit;
