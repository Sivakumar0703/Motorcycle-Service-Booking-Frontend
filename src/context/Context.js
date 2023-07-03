import React ,{createContext,useState,useEffect,useContext} from 'react'
import axios from 'axios'


export  const BikeContext = createContext();

 const MyContext = ({children}) =>  {


 const [bikes , setBikes] = useState();
const [price , setPrice] = useState();
const [bookings , setBookings] = useState();


 useEffect(() => {


   async function getBike(){

      try {


         await axios.get('http://localhost:8080/bikes').then((res) => setBikes(res.data.bikes))
         await axios.get('http://localhost:8080/service/price').then(res => setPrice(res.data.price[0]))
         await axios.get('http://localhost:8080/bookings').then(res => setBookings(res.data.bookings))
        
             

      } catch (error) {
        console.log(error , 'context error')
      }

   }
   getBike();


  }, [])


  return (

    <BikeContext.Provider value = {{bikes , price , setPrice , bookings}} > 

        {children}
      

    </BikeContext.Provider>

  )
}

export default MyContext

export const BikeState = () => {
 return useContext(BikeContext);
}