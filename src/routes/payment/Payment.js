// import React, { useState , useEffect } from 'react'
// import axios from 'axios';

// const Payment = ({ detail, price }) => {

//     const [orderId, setOrderId] = useState();
//     console.log('payment page')


//     useEffect(() => {


//         async function getData() {

//             try {


//                 // razor - to get order id        
//                 await axios.post('http://localhost:8000/razorpay/order', { amount: price }).then((res) => {
//                     console.log('response from backend to get order id', res, res.data, res.data.orderId)
//                     setOrderId(res.data.orderId)
//                     console.log(res.data.orderId)
//                 })



//                 // data to payment collection in database
//                 const payment = axios.post('http://localhost:8000/payment', { // product & user detail to backend for storing in db
//                     brand: detail.bikeCompany,
//                     model: detail.model,
//                     registration: register,
//                     customerName: JSON.parse(localStorage.getItem('user')).userName,
//                     date: date,
//                     price: price,
//                     orderId: orderId,
//                 })
//                 console.log(payment, 'data to db');



//             } catch (error) {
//                 console.log(error)

//             }

//         }
//         getData();
//     }, [])



//     // for payment verification
//     function verify(payment, order, signature) {
//         try {
//             axios.post('http://localhost:8000/razor/payment/verification', { paymentId: payment, orderId: order, signature: signature }).then(res => console.log('payment verification data sent', res))
//             console.log('payment & order ', payment, order);
//         } catch (error) {
//             console.log('error in sending payment verification data cart.js', error)
//         }
//     }


//     // razorpay starts

//     // key: rzp_test_f3Zt6s7fSoiZSu
//     //secret:  ObqLEeSpRqphtxBZI88ju0E7

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         var options = {
//             key: "rzp_test_f3Zt6s7fSoiZSu",
//             secret: "ObqLEeSpRqphtxBZI88ju0E7",
//             price: price * 100,
//             currency: "INR",
//             name: "Online Motocycle Service Booking",
//             description: [bike , model],
//             order_id: orderId,
//             handler: function (response) {

//                 console.log("Payment_ID : ", response.razorpay_payment_id, '|', 'order_id : ', response.razorpay_order_id, '|', 'signature : ', response.razorpay_signature)
//                 // payment verification
//                 if (response.razorpay_payment_id) {
//                     verify(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature)
//                   //  toast.success("Payment Successful");
//                    // navigate('/dummy')
//                 }
//                 // verfication ends
//             },
//             prefill: {
//                 name: JSON.parse(localStorage.getItem('user')).userName, //your customer's name
//                 email: JSON.parse(localStorage.getItem('user')).email,
//                 contact: JSON.parse(localStorage.getItem('user')).mobile
//             },
//             notes: {
//                 address: "online rental office address" // company address
//             },
//             theme: {
//                 color: "#3399cc"
//             }
//         };


//         var pay = new window.Razorpay(options); // if payment is successful
//         pay.open()

//     }






















//     return (

//         <div>
//             {console.log('payment page', price)}

//         </div>

//     )
// }

// export default Payment