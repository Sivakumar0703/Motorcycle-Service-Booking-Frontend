import React, { useEffect, useState } from 'react'
import service_data from './service_data'; // static data (general service list)
import './Service.css'
import { BikeState } from '../../context/Context';
import axios from 'axios';
import Payment from '../payment/Payment';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify'
import Mininav from '../../components/Navigation/Mininav';
import dayjs from 'dayjs';

const Services = () => {

    const { bikes, price } = BikeState()

    const bikeAry = [];
    let brand = [];

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [register, setRegister] = useState('');

    const [bike, setBike] = useState('')
    const [model, setModel] = useState('')
    const [pricee, setPricee] = useState('')

    // address state
    const [houseNumber, setHouseNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [pincode, setPincode] = useState('');

    // disable past date from calendar
    let current_date = new Date();
    let current_time = new Date().toISOString()
    let datee = current_date.getDate(); // 2,5,10,15...
    let month = current_date.getMonth() + 1; // 6,7,10,12
    let year = current_date.getUTCFullYear(); // 2023

    if (month < 10) {
        month = "0" + month; // 03,04,05...
    }
    if (datee < 10) {
        datee = "0" + datee; // 02,03,07
    }


    let minDate = `${year}-${month}-${datee}`; // yyyy-mm-dd


    const [date, setDate] = useState(minDate); // yyyy-mm-dd


    let [detail, setDetail] = useState(); // get a selected bike data for image

    // for modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // order id
    const [orderId, setOrderId] = useState();

// get all brands without duplicates
    bikes && bikes.map((i) => bikeAry.push(i.bikeCompany)) 
    brand = unique(bikeAry)

    // on click book now
    function booknow(e) {
        e.preventDefault();
        handleShow();
        customerData();
    }

    async function customerData() {
        const customer = {
            name,
            mobile,
            date,
            register,
            bike,
            model,
            serviceDate:dayjs(date).format('DD/MM/YYYY'),


            serviceType: 'regular service'
        }
        console.log(customer);
        try {
            let user_data = await axios.post('http://localhost:8000/bookings/general/service/addbooking', customer)
            console.log(user_data);

        } catch (error) {
            console.log('error in posting user data', error)
        }
    }

    useEffect(() => {
        bikes && bikes.map((i) => {
            if (i.model === model) {
                if (i.cc >= 100 && i.cc < 125) {
                    //console.log('cc less than or equal to 125', i.cc, setPrice(550))
                    console.log('cc less than or equal to 125', i.cc, setPricee(price && price.generalServicePrice.general1))
                } else if (i.cc >= 125 && i.cc < 200) {
                    console.log('cc less than or equal to 200', i.cc, setPricee(price && price.generalServicePrice.general2))
                    // console.log('cc less than or equal to 200', i.cc, setPrice(610))
                } else {
                    console.log('cc greater than 200', i.cc, setPricee(price && price.generalServicePrice.general3))
                    // console.log('cc greater than 200', i.cc, setPrice(699))
                }
                setDetail(i)

            }
        })
    }, [model])

    // to remove duplicates in array
    function unique(array) {
        return array.filter((item, index) => array.indexOf(item) === index)
    }
    

    // razor pay area
    useEffect(() => {
        async function getData() {

            try {
                // razor - to get order id        
                price && await axios.post('http://localhost:8000/razorpay/order', { amount: pricee }).then((res) => {
                    console.log('response from backend to get order id', res, res.data, res.data.orderId)
                    setOrderId(res.data.orderId)
                    console.log(res.data.orderId)

                     
                })
            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, [pricee])

    // for payment verification
    function verify(payment, order, signature) {
        try {
            axios.post('http://localhost:8000/razorpay/api/payment/verify', { paymentId: payment, orderId: order, signature: signature }).then(res => console.log('payment verification data sent', res))
            console.log('payment & order ', payment, order);

            axios.post('http://localhost:8000/payments/payment/info', { // product & user detail to backend for storing in db
                brand: detail.bikeCompany,
                model: detail.model,
                registration: register,
                customerName: JSON.parse(localStorage.getItem('user')).userName,
                date: date,
                price: pricee,
                orderId: orderId,
                serviceType: 'regular service',
                name,
                mobile
            })
            handleClose();
        } catch (error) {
            console.log('error in sending payment verification data cart.js', error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        var options = {
            key: "rzp_test_f3Zt6s7fSoiZSu",
            secret: "ObqLEeSpRqphtxBZI88ju0E7",
            amount: pricee * 100,
            currency: "INR",
            name: "Online Motocycle Service Booking",
            description: [bike, model],
            order_id: orderId,
            handler: function (response) {

                console.log("Payment_ID : ", response.razorpay_payment_id, '|', 'order_id : ', response.razorpay_order_id, '|', 'signature : ', response.razorpay_signature)
                // payment verification
                if (response.razorpay_payment_id) {
                    verify(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature)
                    toast.success("Payment Successful");
                    toast.success("Booking successful")
                    // navigate('/dummy')
                }
                // verfication ends
            },
            prefill: {
                name: JSON.parse(localStorage.getItem('user')).userName, //your customer's name
                email: JSON.parse(localStorage.getItem('user')).email,
                contact: JSON.parse(localStorage.getItem('user')).mobile
            },
            notes: {
                address: "online rental office address" // company address
            },
            theme: {
                color: "#3399cc"
            }
        };


        var pay = new window.Razorpay(options); // if payment is successful
        pay.open()

    }




    return (
        <div  >
            <Mininav />


            <div className='booking-form  '>
                <div className='bike-details ' > <form method='get' action=''>
                    <h2> Bike Details </h2>
                    <div className='bike-detail-feilds'> <input className='input' placeholder='Name' value={name} onChange={e => setName(e.target.value)} required /> </div>
                    <div className='bike-detail-feilds'> <input type="tel" name="mobile" pattern="[0-9]{10}" title='please enter 10 digit mobile number' className='input' placeholder='mobile' value={mobile} onChange={e => setMobile(e.target.value)} required /> </div>
                    <div className='bike-detail-feilds'> <input className='input' placeholder='Bike Registration Number' value={register} onChange={e => setRegister(e.target.value)} required /> </div>
                    <div className='bike-detail-feilds'> <select placeholder='Select Bike Company' onChange={e => setBike(e.target.value)} required>
                        <option value=''> Select Bike  </option>
                        {/* {bikes && bikes.map((i) => <option value={i.bikeCompany} key={i._id}> {i.bikeCompany} </option>)} */}
                        {brand.map((i) => <option value={i} key={i._id} > {i} </option>)}


                    </select> </div>
                    <div className='bike-detail-feilds'> <select placeholder='Select Model' onChange={e => setModel(e.target.value)} required>
                        <option value=''> Select Model  </option>
                        {/* {bikes && bikes.map((i) => <option value={i.model} key={i._id}> {i.model} </option>)} */}
                        {bikes && bikes.map((i) => bike && bike == i.bikeCompany ? <option value={i.model} key={i._id}> {i.model} </option> : '')}


                    </select> </div>
                    <div>  <input className='input' id="calendar" type="date" value={date} min={minDate} onChange={e => setDate(e.target.value)} required /> </div>

                    <div>  <button className='btn btn-success' type="submit" onClick={booknow}> BOOK NOW</button> </div>
                </form>
                </div>

                {/* modal */}
                {detail &&
                    <div>
                        <Modal show={show} onHide={handleClose} >
                            <Modal.Header >
                                <Modal.Title style={{ textAlign: "center" }}> General Bike Service </Modal.Title>
                            </Modal.Header>
                            <Modal.Body ><b><p>Brand : </p></b> <span>{detail.bikeCompany}</span> </Modal.Body>
                            <Modal.Body ><b><p>Model : </p></b> <span>{detail.model}</span> </Modal.Body>
                            <Modal.Body><b><p>PRICE : </p></b><span>₹{pricee}</span></Modal.Body>
                            <Modal.Footer>
                                <Button variant="success" onClick={handleSubmit}>
                                    Confirm Payment
                                </Button>
                                <Button variant="danger" onClick={handleClose}>
                                    Close
                                </Button>

                            </Modal.Footer>
                        </Modal>

                    </div>
                }

                <div className='booking-form-img'>

                    <img className='book' src='https://getaways.indianexcursion.in/wp-content/uploads/2020/10/book-now-indianexcursion.png' alt='book now' />
                </div>
            </div>

            {/* bike image div */}

            <div className='bike-img'>
                {detail && detail.model === model ? <img src={detail.image} alt='bike' /> : <img src='' alt='bike' />}
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

export default Services