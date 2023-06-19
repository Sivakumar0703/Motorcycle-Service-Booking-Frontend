import React from 'react'
import { Carousel } from 'react-bootstrap';
import '../Carousel/Carousel.css' ;

const Carousell = () => {
  return (
    <div className="carousel-container">
          
          <Carousel  className='carousel'>

      <Carousel.Item>
       <div className='sliding-img'>
       <img
          className="d-block w-100 "
          src="https://static.vecteezy.com/system/resources/previews/007/135/706/original/mechanic-hold-hex-key-wrench-working-on-motorcycle-at-motorbike-garage-concept-of-motorcycle-maintenance-and-repair-selective-focus-free-photo.jpg"
          alt="First slide"
        />
       </div>
        <Carousel.Caption>
          <h1 className='caption'>Skilled Mechanics</h1>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <div className='sliding-img'>
        <img
          className="d-block w-100 sliding-img"
          src="https://offroadvietnam.com/media/motorbike-spare-parts-for-sale-hanoi-offroad-vietnam-motorcycle-tours-office.jpg?5a7b53&5a7b53"
          alt="Second slide"
        />
</div>
        <Carousel.Caption>
          <h1 className='caption'>Genuine Spares</h1>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <div className='sliding-img' >
        <img
          className="d-block w-100 sliding-img"
          src="https://th.bing.com/th/id/OIP.K1lNMJ8MBuapfjwr0-IL0gHaDh?pid=ImgDet&rs=1"
          alt="Third slide"
        />
</div>
        <Carousel.Caption>
          <h1 className='caption'>On Time Delivery</h1>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>



    </div>
  )
}

export default Carousell