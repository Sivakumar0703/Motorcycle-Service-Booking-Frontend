import React, { useState, useEffect } from 'react'
import '../repair/Repair.css'
import { TextField } from '@mui/material'
import * as yup from 'yup'; // for form validation schema
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify'
import { BikeState } from '../../context/Context';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';

// mui
import MenuItem from '@mui/material/MenuItem'; // for select option
// mui - datepicker
import dayjs from 'dayjs'; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Mininav from '../../components/Navigation/Mininav';

// general service - payment | repair service - booking

const registerSchemaValidation = yup.object({
    userName: yup.string().min(3, 'name should have minimum 3 character').required("Enter Your Name"),
    address1: yup.string().required("Enter address1"),
    mobile: yup.string().matches(/^[0-9]{10}/, "Enter valid mobile number").required("Enter Mobile Number"),
    email: yup.string().email().required("Enter Email"),
    address2: yup.string().required('please enter your city/village'),
    pincode: yup.string().matches(/^[0-9]{6}/, "Please use numbers alone").required('Please enter 6 digit pincode'),
    bike: yup.string().required('Select brand'),
    model: yup.string().required('Select bike model'),
    time: yup.string().required('Select time slot'),

})


const Repair = () => {

    const user = localStorage.getItem('user');
    // console.log(user);
    const { bikes } = BikeState([]);
    const timeslot = ["09:00", "11:00", "14:00", "16:00"];
    const [orderId, setOrderId] = useState();
    const price = 100;
    const bikeAry = [];
    let brand = [];
    const today = dayjs();

    const[disable , setDisable] = useState(false)

    // function disablefn(){
    //     setDisable(true)
    // }


    const [date, setDate] = useState(today);

    // formik function

    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues: {
            name: "",
            address1: "",
            mobile: "",
            email: "",
            address2: "",
            pincode: "",
            serviceType: "repair service",
            bike: '',
            model: '',
            time: '',
            serviceDate: date,
            userId: localStorage.getItem('user').id

        },

        validationSchema: registerSchemaValidation,
        onSubmit: (bookingData) => {
            addbooking(bookingData)
        }

    })

    function addbooking(bookingData){
        axios.post('http://localhost:8000/bookings/repair/service/addbooking', { // product & user detail to backend for storing in db
    //     brand : values.company,
    //      model:values.model,
    //    customerName: user.userName,
    //     date: date,
    //    price: price,
    //    orderId: orderId,
    //    serviceType: 'repair service',
    //    address1: values.address1,
    //    address2: values.address2,
    //    mobile: values.mobile,
    //    pincode: values.pincode,
    //    userId: localStorage.getItem('user').id
    bookingData
   })

   handleSubmitt();
    }



    // get all brands with duplicates
    bikes && bikes.map((i) => bikeAry.push(i.bikeCompany))

    brand = unique(bikeAry)

    // to remove duplicates in brand array
    function unique(array) {
        return array.filter((item, index) => array.indexOf(item) === index)
    }



    // useEffect is used to get order id from razorpay
    useEffect(() => {
        async function getData() {
            try {
                price && await axios.post('http://localhost:8000/razorpay/order', { amount: price }).then((res) => {
                    console.log('response from backend to get order id', res, res.data, res.data.orderId)
                    setOrderId(res.data.orderId)
                    console.log(res.data.orderId)
                })
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [])


    useEffect(()=>{
            if(values.bike.length > 2){
                setDisable(true)
            }
    },[values.model])

    // for payment verification
    function verify(payment, order, signature) {
        try {
            axios.post('http://localhost:8000/razorpay/api/payment/verify', { paymentId: payment, orderId: order, signature: signature }).then(res => console.log('payment verification data sent', res))
            console.log('payment & order ', payment, order);

        } catch (error) {
            console.log('error in sending payment verification data cart.js', error)
        }
    }

    // razorpay payment integration
    const handleSubmitt = () => {
       
        // e.preventDefault();

        var options = {
            key: "rzp_test_f3Zt6s7fSoiZSu",
            secret: "ObqLEeSpRqphtxBZI88ju0E7",
            amount: price * 100,
            currency: "INR",
            name: "Online Motocycle Service Booking",
            description: 'service',
            order_id: orderId,
            handler: function (response) {

                console.log("Payment_ID : ", response.razorpay_payment_id, '|', 'order_id : ', response.razorpay_order_id, '|', 'signature : ', response.razorpay_signature)
                // payment verification
                if (response.razorpay_payment_id) {
                    verify(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature)
                    toast.success("Payment Successful");
                    toast.success("Booking successful");
                   
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

//    function checkModel(){
//     if(values.bike !== ''){
//         setDisable(true)
//     }
    
//    }





    return (
        <div className='repair-service-page'>
            <Mininav />

            <div className='header'>
                <img src="https://i.stack.imgur.com/YlsJf.gif" alt="pulse" />
            </div>

            <h1> Is your bike in bad condition? No worries we are here to help you <span> 🧑‍🔧  </span> </h1>



            <div className='details_and_instructions row '>
               <div className='instructions col-10 col-md-5'>
               <h3> Running Repairs </h3>
                <p> We offers the convenience of availing all kinds of repairs at the doorstep </p>
                <p>  A lot of times you face nagging issues and you don't really know what's gone wrong or
                    need a quick spare fix or replacement. In 90% of the cases, you wouldn't know what part
                    or repair is required to fix your problem. We have built the technology
                    and expertise to help you identify the problem and also a probable solution. Our mechanics
                    in 90% cases, resolve the issues in the first visit itself.</p>

                <p>
                    You can also request for a specific part replacement or specific repair to be performed.
                </p>

                <h4>Exceptions:</h4>

                <p>
                    Any problems relating to your engine or transmission may be required to be inspected at our hub.
                    Worry not! We do pick and drop services at nominal cost.
                </p>
               </div>


                <div className='repair-img col-10 col-md-5'>
                <img src="https://staticimg.insurancedekho.com/uploads/news/images-new/article/5fa7a26d0159b.jpg" alt="repair image" />
            </div>
            </div>

           


            <div className='form'>
                <form onSubmit={handleSubmit}>
                    <div className='form-filling row'>
                        <div className='left col-5'>

                            <TextField id="outlined-basic1" required label="USER NAME" onBlur={handleBlur} variant="outlined" fullWidth margin="normal" name="userName" value={values.userName} onChange={handleChange} /> <br />
                            {touched.userName && errors.userName ? <p style={{ color: "red" }}>{errors.userName}</p> : ""}

                            <TextField id="outlined-basic3" required label="MOBILE NUMBER" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="mobile" value={values.mobile} onChange={handleChange} /> <br />
                            {touched.mobile && errors.mobile ? <p style={{ color: "red" }}>{errors.mobile}</p> : ""}

                            <TextField id="outlined-basic2" required label="EMAIL" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="email" value={values.email} onChange={handleChange} /> <br />
                            {touched.email && errors.email ? <p style={{ color: "red" }}>{errors.email}</p> : ""}

                            <TextField id="outlined-basic2" required label="House No & Street Name" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="address1" value={values.address1} onChange={handleChange} /> <br />
                            {touched.address1 && errors.address1 ? <p style={{ color: "red" }}>{errors.address1}</p> : ""}

                            <TextField id="outlined-basic4" required label="City/Village" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="address2" value={values.address2} onChange={handleChange} /> <br />
                            {touched.address2 && errors.address2 ? <p style={{ color: "red" }}>{errors.address2}</p> : ""} </div>

                        <div className='right col-5'>

                            <TextField id="outlined-basic5" required label="Pincode" variant="outlined" fullWidth margin="normal" name="pincode" value={values.pincode} onChange={handleChange} /> <br/>
                            {touched.pincode && errors.pincode ? <p style={{ color: "red" }}>{errors.pincode}</p> : ""}



                            <TextField select id="Brand" label="Brand" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="bike" value={values.bike} onChange={handleChange}
                                error={touched.bike && Boolean(errors.bike)} helperText={touched.bike && errors.bike} disabled={disable}  > <br/>
                                 
                                <MenuItem key={""} value={""} disabled> --select brand--  </MenuItem>
                               
                                {brand.map((i) => <MenuItem value={i} key={i._id} > {i} </MenuItem>)}
                            </TextField>

                            <TextField select id="Model" label="Model" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="model" value={values.model} onChange={handleChange}
                                error={touched.model && Boolean(errors.model)} helperText={touched.model && errors.model} > <br/>
                                <MenuItem key={""} value={""} disabled> --select brand--  </MenuItem>
                                {bikes && bikes.map((i) =>  values.bike && values.bike == i.bikeCompany ?  <MenuItem value={i.model} key={i._id}> {i.model} </MenuItem> : '')}
                                
                            </TextField>
                            
                                
                            

                        

                            {/* 
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} >

                                <DemoItem label="Date">
                                    <DatePicker
                                        defaultValue={today}
                                        disablePast
                                        views={['year', 'month', 'day']}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider> */}

                            {/* <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker 
                             label='select date'
                             value={values.date}
                             onChange={handleChange}
                             disablePast
                             className='mt-3 mb-2'
                            />
                        </LocalizationProvider> */}

                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker
                                    label='Select Date'
                                    value={date}
                                    onChange={(e) => setDate(`${e.$D}/${e.$M + 1}/${e.$y}`)}
                                    disablePast
                                    className='mt-3 mb-2'
                                />
                            </LocalizationProvider> <br/>



                            <TextField select id="timeslot" label="Time-Slot" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="time" value={values.time} onChange={handleChange}
                                error={touched.time && Boolean(errors.time)} helperText={touched.time && errors.time} >
                                <MenuItem key={""} value={""}> --select time slot--  </MenuItem>
                                {timeslot.map((i) => <MenuItem value={i} key={i}> {i} </MenuItem>)}
                            </TextField> <br/> </div> </div>

                    <div className='form-btn'>
                         <button className='btn btn-primary mb-3 register-btn' type='submit' onClick={handleSubmit} >BOOK NOW</button>  {/* <Tooltip title="hello" placement="right" arrow > <InfoIcon />  </Tooltip>    */}
                    </div>

                </form>


            </div>

           


         <div className='pickup-img mt-3 ml-2 row'>
              <img src={require("../repair/pickup.png")}/>  
         </div>















        </div>
    )
}

export default Repair