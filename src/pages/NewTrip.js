import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';



function NewTrip(){
    const [ latitude, setLatitude ] = useState('');
    const [ longitude, setLongitude ] = useState('');
    const navigate = useNavigate();
     let lat = '';
     let lon = '';
     
async function onSubmit(e) {
    e.preventDefault()
    const user_id = localStorage.getItem ( 'user_id' );
    const form = e.target;
    const formData = new FormData(form);
    const date = formData.get( "date" );
    const destination = formData.get( "destination" );
    const days = formData.get ( "days" );
    const rating = formData.get("reviews");
    const description = formData.get("description");
    const latLon = await fetch (`https://nominatim.openstreetmap.org/search?format=json&q=${destination}`);
    const cordinates = await latLon.json();
    if(cordinates.length>0){
        lat = cordinates[0].lat;
        lon = cordinates[0].lon;
        setLatitude( lat );
        setLongitude( lon );
    } else{
        setLatitude('Country not Found');
        setLongitude( 'Country not Found' );
    }
  
    const values = {date,destination,days,user_id,rating,lat ,lon, description}
    console.log(values);
    
        const response = await fetch(`http://localhost:4000/api/trip`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(values)
        })
     const data = await response.json(values);
}
    
     function onLogOut() {
        navigate( '/' ) 
        window.localStorage.clear();
      }
   
    function goToHomePage(){
       navigate( '/trips' ) 
    }

   return(
    <div className="newTripBody">
        <nav>
            <h1>My trips <span>diary</span></h1>  <span className="myTrips">My trips</span> <span  className="svg"><svg onClick={goToHomePage} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20zm-10-7v6h2v-6h-2z"/></svg></span><span className="svg"><svg onClick={onLogOut} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z"/></svg></span>
       </nav>
       <h2 className='tripHeader'>Create a trip</h2>
     <div className='mandatoryDiv'>You must fill all the mandatory list</div>
     <form onSubmit = { onSubmit } id ='form'>
             <label> Date * </label>
                <input  type = {'date'} name = 'date' placeholder="Date"></input>
            <label> Destination *  </label>
               <input type = {'text'} name = 'destination' placeholder="Choose the place"></input>
            
            <label> Describtion * </label>
                <input className="describtionInput" type = {'text-area'} name = 'description' placeholder="How was the trip?"></input>

            <label> Days * </label>
                <input className="secondHandInput" type = {'text'} name = 'days' placeholder="How many days?"></input>
               <label className="labelUp ratingsLabel">Ratings</label>
                <select className="secondHandInput lineUp select" name='reviews'>
                    <option value={'1'}>1</option>
                    <option value={'2'}>2</option>
                    <option value={'3'}>3</option>
                    <option value={'4'}>4</option>
                    <option value={'5'}>5</option>
                </select>
      
            <label> Lat * </label>
                 <input className="secondHandInput" type = {'text'} name = 'latitude' defaultValue= {`${latitude}`} placeholder="Lat"></input>
            
            <label className="labelUp longLabel"> Long * </label>
          
                 <input className="secondHandInput lineUp" type = {'text'} name = 'longitude' defaultValue= {`${longitude}`}  placeholder="Lon"></input>
                  
                 <button className="UpdateButton" type ={'submit'}>Update</button> <button className="CancelButton" type={"button"}>Cancel</button>
            </form>
    <footer>  
    <h1>My trips <span>diary</span></h1>
    </footer>
    </div>
   )
}

export default NewTrip;