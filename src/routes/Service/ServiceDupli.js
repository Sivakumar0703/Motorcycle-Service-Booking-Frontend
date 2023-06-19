import React, { useState } from 'react'
import service_data from './service_data'; // static data (general service list)
import './Service.css'
import { BikeState } from '../../context/Context';
import axios from 'axios';
import Payment from '../payment/Payment' ;

const Service = () => {


const {bikes} = BikeState()

  //  const data = ["one", "two", "three", "four", "five"];
  //  const [value, setValue] = useState('');
    const[show , setShow] = useState(false);
  //  const[check , setCheck] = useState('')
    //const city = ["Chennai", "Madurai", "Tirchy", "Coimbatore", "Thirunelveli"]

    const[name , setName] = useState('');
    const[mobile , setMobile] = useState('');
    const[register , setRegister] = useState('');
    const[date , setDate] = useState(''); // yyyy-mm-dd
    const[bike , setBike] = useState('')
    const[model , setModel] = useState('')

    // address state
    const[houseNumber , setHouseNumber] = useState('');
    const[street , setStreet] = useState('');
    const[city , setCity] = useState('');
    const[district , setDistrict] = useState('');
    const[pincode , setPincode] = useState('');


    // disable past date from calendar
    let current_date = new Date();
    let current_time = new Date().toISOString()
    //console.log(current_date , ',' ,current_time)
    let datee = current_date.getDate(); // 2,5,10,15...
    let month = current_date.getMonth() + 1 ; // 6,7,10,12
    let year = current_date.getUTCFullYear(); // 2023
    //console.log(datee , month , year)
   
     if(month < 10){
      month = "0" + month; // 03,04,05...
     }
     if(datee < 10){
      datee = "0" + datee; // 02,03,07
     }   

     let minDate = `${year}-${month}-${datee}`; // yyyy-mm-dd
    // console.log(`${datee}-${month}-${year}`)


    





    async function customerData(){

        

        const customer = {
            name,
            mobile,
            date,
            register,
            bike,
            model,
            houseNumber,
            street,
            city,
            district,
            pincode
        }
        console.log(customer);

        try {
            let user_data = await axios.post('http://localhost:8000/bookings/addbooking' , customer).data
            console.log(user_data);
            
        } catch (error) {
            console.log('error in posting user data' , error)
        }

        
        
    }

    // function checklist(e){
    //    console.log(e)
    //         count = count + parseInt(e)
    //      if(count === 1){
    //         console.log(count)
    //         setShow('before increment',true)
    //         count++;
    //        console.log('increment' , count)
    //      } else {
    //         console.log(count)
    //         setShow('before decrement',false)
    //         count = count - 3
    //         console.log('decrement' , count)
    //      }
    // }



    return (
        <div className='service-container'>Service

            {/* closing booking div */}
          


            <div className='booking-form  '>



                <div className='bike-details ' >
                    <h2> Bike Details </h2>
                    <div className='bike-detail-feilds'> <input className='input' placeholder='Name' value={name} onChange={e => setName(e.target.value)}  /> </div>
                    <div className='bike-detail-feilds'> <input className='input' placeholder='mobile' value={mobile} onChange={e => setMobile(e.target.value)} /> </div>
                    <div className='bike-detail-feilds'> <input className='input' placeholder='Bike Registration Number' value={register} onChange={e => setRegister(e.target.value)} /> </div>
                    <div className='bike-detail-feilds'> <select placeholder='Select Bike Company' onChange={ e => setBike(e.target.value)}>
                    <option value=''> Select Bike  </option>
                        {bikes && bikes.map((i) => <option value={i.bikeCompany} key={i._id}> {i.bikeCompany} </option>)}
                    </select> </div>
                    <div className='bike-detail-feilds'> <select placeholder='Select Model' onChange={ e => setModel(e.target.value)}>
                        <option value=''> Select Model  </option>
                        {bikes && bikes.map((i) => <option value={i.model} key={i._id}> {i.model} </option>)}
                    </select> </div>
                    <div>  <input className='input' type="date"  value={date} min={minDate} onChange={e => setDate(e.target.value)} /> </div>
                    <div>  <input type="checkbox" id="checkbox" value="1"  ></input> Pick up and drop  

                    </div>
                    <div>  <button className='btn btn-success' onClick={()=>customerData()}> BOOK NOW</button> </div>
                </div>

                <div className='address ' >
                    <h2> Address </h2>
                    <div> <input className='address-box' placeholder='House No/Flat No' value={houseNumber} onChange={e => setHouseNumber(e.target.value)} disabled={show} /> </div>
                    <div> <input className='address-box' placeholder=' Street Name' value={street} onChange={e => setStreet(e.target.value)} disabled={show} /> </div>
                    <div> <input className='address-box' placeholder='City/Village' value={city} onChange={e => setCity(e.target.value)} disabled={show} /> </div>
                    <div> <input className='address-box' placeholder='District' value={district} onChange={e => setDistrict(e.target.value)} disabled={show} /> </div>
                    <div> <input className='address-box' placeholder='Pincode' value={pincode} onChange={e => setPincode(e.target.value)} disabled={show} /> </div>
                </div>





                <div className='booking-form-img'>

                    <img className='book' src='https://getaways.indianexcursion.in/wp-content/uploads/2020/10/book-now-indianexcursion.png' alt='book now' />
                </div>
            </div>


{/* {console.log(houseNumber , street , city , district , pincode)}
{console.log(name , mobile , register , date)}
{console.log(check)} */}
{console.log(date , 'date')}


            {/* bike image div */}

            <div className='bike-img'>
                <img src='' alt='bike' />
            </div>


            {/* service detail list */}


            <div className='general_service'>


                <div className='service-list'>
                    <p> What are the things get covered in regular service ?  </p>
                    <ul>
                        {service_data.map((i) => <li key={i.id}> {i.value}  </li>)}
                    </ul>

                </div>

                <div className='service-img'>
                    <img src="https://i.pinimg.com/originals/52/d5/59/52d5596e5ca84fa4ef6b7d3da48ac4a6.png" alt="cartoon" />
                </div>

            </div>


            {/*  */}

            <div> hello

            </div>










        </div>














    )
}

export default Service