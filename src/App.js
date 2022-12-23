import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Edit from './pages/Edit';
import LogIn from './pages/LogIn';
import NewTrip from './pages/NewTrip';
import SignUp from './pages/SignUp';
import Trips from './pages/Trips';
import Update from './pages/Update';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<LogIn />}> </Route>
        <Route path = '/sign-up' element = {<SignUp />}> </Route>
        <Route path = '/edit' element = {<Edit />}> </Route>
        <Route path = '/trips' element = {<Trips />}> </Route>
        <Route path = '/update' element = {<Update />}> </Route>
        <Route path = '/neWTrip' element = {<NewTrip />}> </Route>
      </Routes>
  </BrowserRouter>
 );
}

export default App;
