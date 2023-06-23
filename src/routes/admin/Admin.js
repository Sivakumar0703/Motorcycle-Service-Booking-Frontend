import React, { useEffect, useState } from 'react'
import Mininav from '../../components/Navigation/Mininav'
import Footer from '../../components/Footer/Footer'
import { toast } from 'react-toastify'
import { BikeState } from '../../context/Context'
import axios from 'axios'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import '../admin/Admin.css'
import Table from 'react-bootstrap/Table';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Admin = () => {

    const { bikes } = BikeState();

    const today = new Date
    const date = today.getDate().toString();
    const month = today.getMonth() + 1;
    const year = today.getFullYear().toString();
    // console.log(`${date}/${month}/${year}`)
    const current_date = `${date}/${month}/${year}`;

    console.log(current_date , 'current date')

    // make new collection and store the value , update it though api call;get values in context and pass it
    // const[price1 , setPrice1 ] = useState(550);
    // const[price2 , setPrice2 ] = useState(610);
    // const[price3 , setPrice3 ] = useState(699);
    // console.log(price1 , price2,price3)

    // adding new bike
    const [bikeCompany, setBikeCompany] = useState('');
    const [model, setModel] = useState('');
    const [cc, setCc] = useState('');
    const [image, setImage] = useState('');
    // deleting existing bike
    const [brand, setBrand] = useState('');
    const [bikeModel, setBikeModel] = useState('');

    // search
    const [search, setSearch] = useState('');
    const [psearch, setPsearch] = useState('');

    //payment
    const [paymentData, setPaymentData] = useState();
// get bookings data
    async function getbookings(){
        await axios.get('http://localhost:8000/bookings').then((res) => setPaymentData(res.data.bookings))
        console.log(paymentData)
      }


    useEffect(() => {
       
        getbookings();


    }, [])


    async function savedata() {

        const newBike = {
            bikeCompany,
            model,
            cc,
            image
        }

        try {
            await axios.post('http://localhost:8000/bikes/addbike', newBike)
            window.location.reload(true)
        } catch (error) {
            console.log('error in adding new bike', error);
        }
        setBikeCompany('');
        setModel('');
        setCc('');
        setImage('');

    }
    // deleting bike data
    function deleteData(data) {
        const id_number = data._id;
        try {
            axios.delete(`http://localhost:8000/bikes/delete/${id_number}`)
            window.location.reload(true)

        } catch (error) {
            console.log('error in deleting bike data', error)
        }
    }

    let Home_Service = 0;
    let today_home_service = 0;
   
  function homeServiceCount(){

   
    
    paymentData && paymentData.map(i => {
        
        
        let service_date = i.serviceDate?.split('/')[0];
        let service_month = i.serviceDate?.split('/')[1];
        
        if( (date >= service_date) && (month >= service_month))  {
         //  i.homeService ? count++ : count
            if(i.homeService){
                Home_Service++;
            } 

        } else if( (date == service_date) && (month == service_month) ){
            if(i.homeService){
                today_home_service++;
            }
        }
        

    })

    return [Home_Service,today_home_service]

  }

    // paymentData.map(i => {
    //     if( (date >= i.serviceDate.split('/')[0]) && (month >= i.serviceDate.split('/')[1]))  {
    //         i.homeService ? count++ : ''
    //     }

    // })




    return (

        <div>
            <Mininav />


            {/* <div>  
            <p> cost for general service of bikes having cc 100 - 125 is :</p> <span> ₹  </span> <input value={price1} onChange={e => setPrice1(e.target.value)}/>
            <p> cost for general service of bikes having cc 125 - 200 is :</p> <span> ₹  </span> <input value={price2} onChange={e => setPrice2(e.target.value)}/>
            <p> cost for general service of bikes having cc 200 - 200 above :</p> <span> ₹  </span> <input value={price3} onChange={e => setPrice3(e.target.value)}/>
        </div> */}

            <div className='add-new-bike'>
                <p className='add-bike-heading'> ADD NEW BIKE HERE</p>
                <TextField className="mb-3 mt-3" label="Bike Company" variant="outlined" color="secondary" value={bikeCompany} onChange={(e) => setBikeCompany(e.target.value)} style={{ width: "300px" }} />
                <TextField className="mb-3" label="Model" variant="outlined" color="secondary" value={model} onChange={(e) => setModel(e.target.value)} style={{ width: "300px" }} />
                <TextField className="mb-3" label="Bike CC" variant="outlined" color="secondary" value={cc} onChange={(e) => setCc(e.target.value)} style={{ width: "300px" }} />
                <TextField className="mb-3" label="Image Link" variant="outlined" color="secondary" value={image} onChange={(e) => setImage(e.target.value)} style={{ width: "300px" }} />
                <button className="mb-5 btn btn-primary" color="secondary" onClick={() => savedata()}> SAVE </button>
            </div>

            {/* <div className='delete-bike'>
                <input value={brand} onChange={e => setBrand(e.target.value)} placeholder='Bike Company' />
                <input value={bikeModel} onChange={e => setBikeModel(e.target.value)} placeholder='Bike Model' />

            </div> */}
<h3>UPCOMING SERVICES</h3>       <span> Upcoming Home Service : {homeServiceCount()[0]} </span> <span> Today Home Service : {homeServiceCount()[1]} </span>  
            <div className='search-bar'>
                <input type='search' placeholder='Search here...' value={psearch} onChange={e => setPsearch(e.target.value)} />
            </div>

            {/* <div className='upcoming-services'>
                <Table striped className='mb-3 mt-3' variant='info' hover responsive>

                    <thead >
                        <tr>
                            <th>SI.NO</th>
                            <th>Customer Name</th>
                            <th>Contact</th>
                            <th>Bike Company</th>
                            <th>Model</th>
                            <th>Service Type</th>
                            <th>Service Date</th>
                            <th>Amount Paid</th>
                        </tr>
                    </thead>
                    <tbody>{paymentData && paymentData.filter(item => {
                        if (psearch === '') {
                            return item
                        } else if (item.bike.toLowerCase().includes(psearch.toLowerCase())) {
                            return item
                        } else if (item.model.toLowerCase().includes(psearch.toLowerCase())) {
                            return item
                        } else if (item.name.toLowerCase().includes(psearch.toLowerCase())) {
                            return item
                        } else if (item.mobile.includes(psearch)) {
                            return item
                        } else if (item.serviceType.toLowerCase().includes(psearch.toLowerCase())) {
                            return item
                        } else if (item.paid.includes(psearch)) {
                            return item
                        } else if (item.serviceDate.includes(psearch)) {
                            return item
                        }
                    })

                        .map((item, index) => {
                            return (
                                <tr key={item._id}>
                                    <td> {index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.bike}</td>
                                    <td>{item.model}</td>
                                    <td>{item.serviceType}</td>
                                    <td>{item.serviceDate}</td>
                                    <td>{item.paid}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div> */}
{/* ****************************************************************************** */}
{
     <div className='upcoming-services'>
                <Table striped className='mb-3 mt-3' variant='info' hover responsive>

                    <thead >
                        <tr>
                            <th>SI.NO</th>
                            <th>Customer Name</th>
                            <th>Contact</th>
                            <th>Bike Company</th>
                            <th>Model</th>
                            <th>Service Type</th>
                            <th>Home Service</th>
                            <th>Service Date</th>
                            <th>Time Slot</th>
                            <th>Amount Paid</th>
                        </tr>
                    </thead>
                    <tbody>{paymentData && paymentData.filter(item => {
                        if (psearch === '') {
                            return item
                        } else if (item.bike.toLowerCase().includes(psearch.toLowerCase())) {
                            return item
                        } else if (item.model.toLowerCase().includes(psearch.toLowerCase())) {
                            return item
                        } else if (item.name.toLowerCase().includes(psearch.toLowerCase())) {
                            return item
                        } else if (item.mobile.includes(psearch)) {
                            return item
                        } else if (item.serviceType.toLowerCase().includes(psearch.toLowerCase())) {
                            return item
                        } else if (item.paid.includes(psearch)) {
                            return item
                        } else if (item.serviceDate.includes(psearch)) {
                            return item
                        }
                    })
                        .map((item, index) => {

                            if( (date >= item.serviceDate?.split('/')[0]) && (month >= item.serviceDate?.split('/')[1]))  {
                                return(
                                    <tr key={item._id}>
                                    <td> {index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.bike}</td>
                                    <td>{item.model}</td>
                                    <td>{item.serviceType}</td>
                                    <td>{item.homeService ? 'YES' : 'NO'}</td>
                                    <td>{item.serviceDate}</td>
                                    <td>{item.time}</td>
                                    <td>{item.paid}</td>
                                    </tr> 
                                )                            
                                } 
                        })}
                    </tbody>
                </Table>
            </div>                              
}



<h3>SERVICES WE PROVIDE FOR</h3>
            <div className='search-bar'>
                <input type='search' placeholder='Search here...' value={search} onChange={e => setSearch(e.target.value)} />
            </div>



            <Table striped responsive className='mb-3 mt-3'>
                <thead>
                    <tr>
                        <th>SI.NO</th>
                        <th>Bike Company</th>
                        <th>Model</th>
                        <th>CC</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>{bikes && bikes.filter(item => {
                    if (search === '') {
                        return item
                    } else if (item.bikeCompany.toLowerCase().includes(search.toLowerCase())) {
                        return item
                    } else if (item.model.toLowerCase().includes(search.toLowerCase())) {
                        return item
                    } else if (item.cc.toLowerCase().includes(search.toLowerCase())) {
                        return item
                    }
                })

                    .map((item, index) => {
                        return (
                            <tr key={item._id}>
                                <td> {index + 1}</td>
                                <td>{item.bikeCompany}</td>
                                <td>{item.model}</td>
                                <td>{item.cc}</td>
                                <td> <button className='btn btn-danger' onClick={() => deleteData(item)}> <DeleteForeverIcon /> </button>  </td>
                            </tr>
                        )
                    })}


                </tbody>
            </Table>

            <Footer />
        </div>

    )
}

export default Admin