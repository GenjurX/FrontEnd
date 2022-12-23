import React, {useState}  from "react";
import Map from "../components/Map";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Table from "../components/Table";

 function Trips(){
    const [ visibleTable,setVisibleTable] = useState(true);
    const [backGroundColorTable, setBackGroungTable] = useState({background:'black',color:'white'})
    const [backGroundColorMap, setBackGroungMap] = useState({background:'white',color:'black'})
    
  function showTable(){
    setVisibleTable ( true )
    setBackGroungMap({backgroundColor:'white',color:'black'})
    setBackGroungTable({backgroundColor:'black',color:'white'})
  }
  
  function showMap(){
    setVisibleTable ( false )
    setBackGroungMap({backgroundColor:'black',color:'white'})
    setBackGroungTable({backgroundColor:'white',color:'black'})
  }

 return (
  <div className="tripsDiaryPage">
      <Navbar />
      <div className="buttonContainer">
         <button className="map" onClick={showMap} style={backGroundColorMap}>Map</button> <button className="table clickedColor" style={backGroundColorTable} onClick={showTable}>Table</button>
      </div>
   {visibleTable ?  <Table /> : <Map />}
      <Footer />
    </div>
  )
}

export default Trips;