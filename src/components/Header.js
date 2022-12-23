import React from 'react'

const Header = () => {
  return (
    <div className="container-fluid d-flex px-5 py-2 justify-content-between bg-white border border-b  ">
    <div className="d-flex container w-75 ">
        <h1 className='fw-bold'>My trips <span className="fw-light">diary</span></h1> 
    </div>
        <div className="ms-5 my-auto me-auto align-self-end">
    </div> 
  </div>
    )
}

export default Header;