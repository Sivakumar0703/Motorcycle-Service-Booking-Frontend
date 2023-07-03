import React from 'react'
import '../homepage/Homepage.css'
import Header from '../../components/Header/Header'
import Carousell from '../../components/Carousel/Carousel'
import Nav from "../../components/Navbar/Nav"
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'

const Homepage = () => {

const navigate = useNavigate();

  return (
    <div className='homepage'>

      <Nav />
      <div> <Carousell />   </div>



      {/* <div className='service_list'>

        <div className='box-1 card'>
          <p>SERVICE</p>
          <div className='service_img'> <img src="https://media.istockphoto.com/vectors/repair-control-group-service-industry-symbol-vector-illustration-vector-id1063013366?k=6&m=1063013366&s=170667a&w=0&h=8N4SthVkHcLKmEgPhJzxpaekWxYB9AZ8NEip13P0GCs=" alt="service-img" />
          </div>
          <button className='btn btn-primary'>Click me</button>
        </div>

        <div className='box-2 card'>
          <p>WATER WASH</p>
          <div className='service_img'>
            <img src="https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=http%3a%2f%2fcdni.autocarindia.com%2fExtraImages%2f20171122115626_6---Shampoo-2-copy.jpg&h=578&w=872&c=1&q=100" alt="bike wash" />
          </div>
          <button className='btn btn-primary'>Click me</button>
        </div>


        <div className='box-3 card'>
          <p>REPAIRS</p>
          <div className='service_img'>
            <img src='https://th.bing.com/th/id/R.ac9c69ff704fa14efcba17e85cbf890b?rik=n%2fdhlwlCAXRaSA&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f0796%2f5185%2fproducts%2fmotorcycleheartbeat-decal-jpg_grande.jpg%3fv%3d1600794470&ehk=ykoijdgk4VHV1dg2WkPtDKWFvBgEK5Uw5Db%2f69V%2frhc%3d&risl=&pid=ImgRaw&r=0' alt="service-img" />
          </div>
          <button className='btn btn-primary'>Click me</button>
        </div>


      </div> */}

      <div className='service-container'>

        <div className='service box-1'>
          <span> WASH </span>  
          <div className='service-image'> <img src="https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=http%3a%2f%2fcdni.autocarindia.com%2fExtraImages%2f20171122115626_6---Shampoo-2-copy.jpg&h=578&w=872&c=1&q=100" alt="service-img" /> </div>
          <button className='button btn btn-primary' onClick={()=>navigate('/washing')}>Click Me</button> 
        </div>


        <div className='service box-2'>
          <span>  SERVICE </span>  
          <div className='service-image'> <img src="https://media.istockphoto.com/vectors/repair-control-group-service-industry-symbol-vector-illustration-vector-id1063013366?k=6&m=1063013366&s=170667a&w=0&h=8N4SthVkHcLKmEgPhJzxpaekWxYB9AZ8NEip13P0GCs=" alt="service-img" /> </div>
           <button className='button btn btn-primary' onClick={()=>navigate('/service')} >Click Me</button>  
        </div>

        <div className='service box-3'>
           <span> REPAIR </span> 
          <div className='service-image'> <img src='https://th.bing.com/th/id/R.ac9c69ff704fa14efcba17e85cbf890b?rik=n%2fdhlwlCAXRaSA&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f0796%2f5185%2fproducts%2fmotorcycleheartbeat-decal-jpg_grande.jpg%3fv%3d1600794470&ehk=ykoijdgk4VHV1dg2WkPtDKWFvBgEK5Uw5Db%2f69V%2frhc%3d&risl=&pid=ImgRaw&r=0' alt="service-img" /> </div>
          <button className='button btn btn-primary' onClick={()=>navigate('/repair')} >Click Me</button>  
        </div>

      </div>


      <div className='about-servcie'>
        <div className='about-card'>

        
        <p className='about-title'>  QUALITY ASSURED </p>
        <p className='about-text'>  The best two wheeler services delivered in your parking with assured quality. </p>
        <ul>
          <li> Contactless Service </li>
          <li> Genuine Spares </li>
          <li> Skilled Mechanics </li>
          <li> 7 day service warranty </li>
        </ul>
        </div>

        <div className='Qualitycheck-img'>
        <img src={require("./mechanics.webp")} alt="mechanics" />
        </div>

      </div>




      <Footer />
    </div>
    
  )
}

export default Homepage