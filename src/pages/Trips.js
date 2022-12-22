import React, {useState}  from "react";
import Map from "../components/Map";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Table from "../components/Table";

 function Trips(){
    const [ visibleTable,setVisibleTable] = useState(true);
    
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

 return (
  <div className="tripsDiaryPage">
      <Navbar />
      <div className="buttonContainer">
         <button className="map" onClick={showMap}>Map</button> <button className="table clickedColor" onClick={showTable}>Table</button>
      </div>
   {visibleTable ?  <Table /> : <Map />}
      <Footer />
    </div>
  )
}

export default Trips;