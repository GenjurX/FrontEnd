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
    <div className='flex-column'>
      <div className='flex-container'>
        <span>{date}</span>
        <span className='days'>{days}</span>
      </div>
      <div className='flex-column'>
        <span  className='elements'>{destination}</span>
        <span className='elements'>{description}</span>
        <span className='elements'><Staring rating={rating}/></span>
      </div>
    </div>
  )
}

export default CustomizedPopup;