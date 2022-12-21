import React, {useState}  from "react";
import { useNavigate } from 'react-router-dom'
import Map from "./Map";
//import './trips.css'

 function Trips(){
    const [ trips,setTrips ] = useState([]);
    const [ visibleTable,setVisibleTable] = useState(true);
    const navigate = useNavigate();

 React.useEffect(() => {
    async function TripsCreated () {
    const userId = localStorage.getItem ( 'user_id' )
    const response = await fetch (`http://localhost:4000/api/${userId}/trips/`)
    const data = await response.json();
   setTrips( data )
    }
   TripsCreated () ;
      },[])
   
 async function onDelete(e){
    if ( e.target.dataset.number ){
     await fetch( `http://localhost:4000/api/trip/${e.target.dataset.number }`, {
       method: 'DELETE'
    })  
     alert ( `Your trip with id ${e.target.dataset.number} has been cancelled ` )
     }
     setTimeout(()=>{
      window.location.reload()
     },1300)
   }
     
  function onUpdate( e ){
    if( e.target.dataset.number ){
    localStorage.setItem( 'id',e.target.dataset.number )
    navigate( '/update' );
   }
  }

  function showTable(){
    setVisibleTable ( true )
    document.querySelector('.table').classList.add('clickedColor')
    document.querySelector('.map').classList.remove('clickedColor')
  }
  
  function showMap(){
    setVisibleTable ( false )
    document.querySelector('.table').classList.remove('clickedColor')
    document.querySelector('.map').classList.add('clickedColor')
  }

  function onLogOut() {
    navigate( '/' ) 
    window.localStorage.clear();
  }
    
  function newTrip(){
    navigate( '/newTrip' ) 
  }
    return(
         <div className="tripsDiaryPage">
            <nav>
            <h1>My trips <span>diary</span></h1>  <span className="myTrips">My trips</span> <span  className="svg"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20zm-10-7v6h2v-6h-2z"/></svg></span><span className="svg"><svg onClick={onLogOut} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z"/></svg></span>
            </nav>
             <div className="buttonContainer">
            <button className="map" onClick={showMap}>Map</button> <button className="table clickedColor" onClick={showTable}>Table</button>
            </div>
        {visibleTable ?  <div className="spanContainer">
          <span className="myTrips">My trips</span>   <span onClick={newTrip} className="newTrip">New Trip</span> 
            <table>
             <tbody>
               <tr>
            <th>ID</th>
            <th>Date</th> 
           <th>Destination</th> 
             <th>Days</th>  
            <th>Ratings</th>  
            <th></th>
            <th></th>
             </tr>
             {trips.map((trip,i)=>{
      return (<tr key = {i}>
                <td>{trip.id}</td> 
                  <td>{trip.date}</td> 
                  <td>{trip.destination}</td> 
                 <td>{trip.days}</td> 
                    <td>4</td>  
              <td><svg className="update" data-number = {`${trip.id}`} onClick={onUpdate}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"/></svg></td> 
             <td><svg className="cancel" data-number = {`${trip.id}`} onClick={onDelete} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"/></svg></td>
         </tr> 
      ) 
     })
    }
     </tbody>
          </table>
          </div>: <Map />}
          
          <footer>  <h1>My trips <span>diary</span></h1></footer>
        </div>
        
    )
}

export default Trips;