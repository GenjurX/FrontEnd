import React from 'react'

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
    <div className=''>
      <div className='flex w-full'>
      <span>{date}</span>
      <span className='ml-10'>{days}</span>
      </div>
      <span className='flex mt-1 justify-center'>{destination}</span>
      <span className='flex mt-1 justify-center'>{description}</span>
      <span className='flex mt-1 justify-center'><Staring rating={rating}/></span>

    </div>
  )
}

export default CustomizedPopup;