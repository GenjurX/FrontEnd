import React,{useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Update(){
    const [ latitude, setLat ] = useState('')
    const [ longitude, setLon ] = useState('')
    const [countryNotFound, setCountryNotFound] = useState(false)
    const [trip,setTrip] = useState([])
    const id_trip = localStorage.getItem( 'id' );
    const navigate = useNavigate()
    let lat = ''
    let lon = ''

    const user_id =  localStorage.getItem( 'user_id' );
    React.useEffect(() => {
        async function fetchUpdatedTrip () {
            const response = await fetch(`http://localhost:4000/api/${id_trip}/trip`);
            const data = await response.json();
            setTrip(data)
         }
        fetchUpdatedTrip();
      }, []);

    

async function  onSubmit(e) {
    e.preventDefault()
    const form = e.target;
    const formData = new FormData ( form );
    const date = formData.get ( "date" );
    const destination = formData.get ( "destination" );
    const days = formData.get ( "days" );
    const rating = formData.get( "reviews" );
    const description = formData.get("description");
    const latLon = await fetch (`https://nominatim.openstreetmap.org/search?format=json&q=${destination}`);
    const cordinates = await latLon.json();
    if(cordinates.length>0){
        lat = cordinates[0].lat
        lon = cordinates[0].lon
        setLat( lat )
        setLon( lon )
        setCountryNotFound(false)
        alert ('Your trip has been Updated')
    } 
    else{
        setCountryNotFound(true)
        setLat('');
        setLon('');
    }
    const values = {date,destination,days,user_id,rating,lat ,lon,description}
    const response = await fetch(`http://localhost:4000/api/trip/${id_trip}`, {
       method: 'PUT', headers: {
           'Content-Type': 'application/json'
        }, body: JSON.stringify(values)
    })
    const data = await response.json()
}

function onCancel(){
    navigate('/trips')
}
console.log(trip)
    return(
        <div className='container-fluid bg-white'>
            <Navbar />
            <div className='container mx-auto  w-50'>
            <h2 style ={{fontSize:'1.5rem'}} className='fw-bold text-center mt-3'>Update Trip #{id_trip}</h2>
            <div className="text-center mx-auto my-1 py-1 text-danger border border-danger w-50">You must fill all the mandatory list</div>
            {trip.map((trip,i)=>{
            return(<form key={i} onSubmit = { onSubmit } id ='form' className='d-flex flex-column w-75 mx-auto'>
                    <label className='mb-1'> Date * </label>
                    <input className='p-1' type = {'text'} onFocus={
    (e)=> {
      e.currentTarget.type = "date";
      e.currentTarget.focus();
     }
   } name = 'date' placeholder={`${trip.date}`} required></input>
                    <label className='mt-2 mb-1'> Destination *  </label>
                    <input className='p-1' type = {'text'} name = 'destination' placeholder={`${trip.destination}`} required></input>
                    <label className='mt-2 mb-1'> Description * </label>
                    <input className='px-2 py-3' type = {'text-area'} name = 'description' placeholder={`${trip.description}`} required></input>
                    <div className='row  mt-2 align-middle'>
                        <div className='col-6 d-flex flex-column'>
                            <label className="mb-1"> Days * </label>
                            <input className="p-1" type = {'number'} name = 'days' placeholder={`${trip.days}`} required></input>
                        </div>
                        <div className='col-6 d-flex flex-column'>
                            <label className="mb-1">Rating *</label>
                            <select className=" py-2" name='reviews' placeholder={`${trip.rating}`} required>
                                <option value={'1'}>1</option>
                                <option value={'2'}>2</option>
                                <option value={'3'}>3</option>
                                <option value={'4'}>4</option>
                                <option value={'5'}>5</option>
                            </select>
                        </div>      
                    </div>
                    <div className='row  mt-2 my-auto'>
                        <div className='col-6 d-flex flex-column'>
                            <label className="mb-1"> Lat * </label>
                            <input style={{background:'rgb(206, 200, 192)',color:"white"}} className="p-1" type = {'text'} name = 'latitude' defaultValue= {`${latitude}`} placeholder="Lat" readOnly></input>
                        </div>
                        <div className=' col-6 d-flex flex-column'>
                            <label className="mb-1"> Long * </label>
                            <input style={{background:'rgb(206, 200, 192)',color:"white"}} className="p-1" type = {'text'} name = 'longitude' defaultValue= {`${longitude}`}  placeholder="Lon" readOnly></input>
                        </div>
                    </div>     
                    <div className='d-flex mt-3 mx-auto gap-3'>
                        <button className="px-3 py-1 rounded" type={"button"} onClick={onCancel}>Cancel</button>
                        <button className="btn btn-dark px-5 py-1 rounded text-white" type ={'submit'}>Create</button> 
                    </div> 
                </form>
            )
                })}
            </div>
            {countryNotFound ? <p className="text-center mt-3 text-danger">This country was not found in our system !!!</p>:false}
            <Footer />
        </div>
    )
}

export default Update;