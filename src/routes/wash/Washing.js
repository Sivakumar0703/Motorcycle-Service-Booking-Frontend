import React from 'react'
import "../wash/Washing.css"
import Booking from '../../components/Booking/Booking'
import Mininav from '../../components/Navigation/Mininav';
import { BikeState } from '../../context/Context';

const Washing = () => {

  const {price} = BikeState();
  console.log(price)

  const amount = price &&  price.washServicePrice;
  console.log(amount)
  const serviceType = "Water Wash";
  const url = "http://localhost:8080/bookings/water/wash/service/addbooking";


  return (
    <div className='washing-page'>

      <Mininav />

      <div className='img-info'>

        <div className='bike-wash-img  m-2'>
          <img src={require("../wash/Bike-Wash.jpg")} alt="bike-wash" />
        </div>


        <div className='info-container'>

          <div className='info-1'>
            <p className='question'> Why it is required?</p>
            <p> This service is recommended to maintain the basic hygiene of the Bike.  </p>
          </div>

          <div className='info-2'>
            <p className='question'> How we do it? </p>
            <p> This service includes Foam Wash of Bike's Body paint together with the polishing of Tyre/ Plastic/ Vinyl components of the bike.
              This comprehensive service helps to keep Bike clean, tidy and shiny  </p>
          </div>

        </div>

      </div>



        {/* <div className='main'>main

          <div className='sub1'> 
          <div className='bike-wash-img  m-2'>
          <img src={require("../wash/Bike-Wash.jpg")} alt="bike-wash" />
        </div>

          </div>

          <div  className='sub2'>
           <div className='info-1 m-2'>
            <p className='question'> Why it is required?</p>
            <p> This service is recommended to maintain the basic hygiene of the Bike.  </p>
          </div>

          <div className='info-2'>
            <p className='question'> How we do it? </p>
            <p> This service includes Foam Wash of Bike's Body paint together with the polishing of Tyre/ Plastic/ Vinyl components of the bike.
              This comprehensive service helps to keep Bike clean, tidy and shiny  </p>
          </div>

          </div>

        </div> */}









     <div> <Booking amount={amount} url={url} serviceType={serviceType} className='mt-3' /> </div>

      {/* {amount={} url={}} serviceType={} */}























    </div>
  )
}

export default Washing