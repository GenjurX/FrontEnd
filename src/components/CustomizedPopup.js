import React from 'react';

const CustomizedPopup = ({destination, date, 
    days, description, rating}) => {

    function Staring ({rating}) {
        let style = "";
        for (let i=0; i<rating; i++) {
          style += "⭐";
      }
        return style;
      }

  return (
  <div>
    <div className='d-flex justify-content-between'>
      <span>{date}</span>
      <span>{days} days</span>
    </div>
    <div className='d-flex flex-column'>
      <span className='text-center mt-1 fw-bold fs-5'>{destination}</span>
      <span className='text-center mt-1'>{description}</span>
      <span className='text-center mt-1'><Staring rating={rating}/></span>
    </div>

  </div>
  )
}

export default CustomizedPopup;