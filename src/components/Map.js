import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomizedPopup from "./CustomizedPopup";
import L from 'leaflet';


function Map() {

  const [trips, setTrips] = React.useState([]);
  const user_id = localStorage.getItem('user_id');
  
  const marker = L.icon ({
    iconUrl: require('./redMarker.png'),
    iconSize:  [25, 25]
  });

  React.useEffect(() => {
    async function fetchTrips () {
        const response = await fetch(`http://localhost:4000/api/${user_id}/trips`);
        const data = await response.json();
        setTrips(data);
    }
    fetchTrips();
  }, []);
<<<<<<< Updated upstream
 
=======

  const navigate = useNavigate();
    function newTrip(){
      navigate('/newTrip'); 
    }

>>>>>>> Stashed changes
  return (
    <div className="position-relative">
       <div className="map-container">
        <MapContainer className="map-screen"  center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false}>
          <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          {trips.map(({ lat, lon, destination, date, description, days, rating }, index) => (
            <Marker key={index} position={[lat, lon]} icon={marker}>
              <Popup><CustomizedPopup date={date} destination={destination} description={description} days={days} rating={rating} /></Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <button className="mapNewTrip" onClick={newTrip}>New Trip</button>
    </div>
  );
}

export default Map;
