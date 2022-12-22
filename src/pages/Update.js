import React,{useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Update(){
    const [ latitude, setLat ] = useState('')
    const [ longitude, setLon ] = useState('')
    const id_trip = localStorage.getItem( 'id' );
    let lat = ''
    let lon = ''

async function  onSubmit(e) {
    e.preventDefault()
    const form = e.target;
    const formData = new FormData ( form );
    const date = formData.get ( "date" );
    const destination = formData.get ( "destination" );
    const days = formData.get ( "days" );
    const rating = formData.get( "reviews" );
    const user_id =  localStorage.getItem( 'user_id' );
    const description = formData.get("description");
    const latLon = await fetch (`https://nominatim.openstreetmap.org/search?format=json&q=${destination}`);
    const cordinates = await latLon.json();
    if(cordinates.length>0){
        lat = cordinates[0].lat
        lon = cordinates[0].lon
        setLat( lat )
        setLon( lon )
    } else{
        setLat('Country not Found')
        setLon( 'Country not Found')
    }

    const values = {date,destination,days,user_id,rating,lat ,lon,description}

    const response = await fetch(`http://localhost:4000/api/trip/${id_trip}`, {
       method: 'PUT', headers: {
           'Content-Type': 'application/json'
        }, body: JSON.stringify(values)
       })
    
    const data = await response.json()
   
    }

    
    return(
        <div className="updateBody">
        <Navbar />
            <h2 className="tripHeader">Update trip #{id_trip}</h2>
            <div className="mandatoryDiv">You must fill all the mandatory list</div>
            <form onSubmit = { onSubmit } id ='form'>
             <label> Date * </label>
                <input  type = {'date'} name = 'date' placeholder="Date"></input>
            <label> Destination *  </label>
               <input type = {'text'} name = 'destination' placeholder="Choose the place"></input>
            
            <label> Describtion * </label>
                <input className="describtionInput" type = {'text-area'} name = 'description' placeholder="How was the trip?"></input>

            <label> Days * </label>
                <input className="secondHandInput" type = {'text'} name = 'days' placeholder="How many days?"></input>
               <label className="labelUp ratingsLabel" >Ratings</label>
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
       <Footer />
       </div>
      )
}

export default Update;