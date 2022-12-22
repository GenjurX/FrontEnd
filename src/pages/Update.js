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
        <div className='container-fluid bg-white'>
        <Navbar />
        <div className='container mx-auto  w-50'>
        <h2 className='fw-bold text-center mt-3'>Update Trip #{id_trip}</h2>
          <div className="text-center mx-auto my-1 py-1 text-danger border border-danger w-50">You must fill all the mandatory list</div>
           <form onSubmit = { onSubmit } id ='form' className='d-flex flex-column w-75 mx-auto'>
              <label className='mb-1'> Date * </label>
                 <input className='p-1' type = {'date'} name = 'date' placeholder="Date"></input>
             <label className='mt-2 mb-1'> Destination *  </label>
                <input className='p-1' type = {'text'} name = 'destination' placeholder="Choose the place"></input>
             
             <label className='mt-2 mb-1'> Description * </label>
                 <input className='px-2 py-3' type = {'text-area'} name = 'description' placeholder="How was the trip?"></input>
             <div className='row  mt-2 align-middle'>
                 <div className='col-6 d-flex flex-column gap-2'>
                     <label className=''> Days * </label>
                     <input className="p-1" type = {'number'} name = 'days' placeholder="How many days?"></input>
                 </div>
                 <div className='col-6 d-flex flex-column'>
                     <label className="mb-2">Rating *</label>
                     <select className=" py-2" name='reviews'>
                         <option value={'1'}>1</option>
                         <option value={'2'}>2</option>
                         <option value={'3'}>3</option>
                         <option value={'4'}>4</option>
                         <option value={'5'}>5</option>
                     </select>
                 </div>
                 
             </div>
             <div className='row  mt-2 my-auto'>
                 <div className='col-6 d-flex flex-column gap-2'>
                  <label> Lat * </label>
                     <input className="p-1" type = {'text'} name = 'latitude' defaultValue= {`${latitude}`} placeholder="Lat"></input>
                 </div>
                 <div className=' col-6 d-flex flex-column'>
                     <label className="mb-2"> Long * </label>
                     <input className="p-1" type = {'text'} name = 'longitude' defaultValue= {`${longitude}`}  placeholder="Lon"></input>
                 </div>
             </div>     
             <div className='d-flex mt-3 mx-auto gap-3'>
                 <button className="px-3 py-1 rounded" type={"button"}>Cancel</button>
                 <button className="btn btn-dark px-5 py-1 rounded text-white" type ={'submit'}>Create</button> 
             </div> 
             </form>
             </div>
          <Footer />
     </div>
      )
}

export default Update;