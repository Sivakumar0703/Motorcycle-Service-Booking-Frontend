import React ,{createContext,useState,useEffect,useContext} from 'react'
import axios from 'axios'


export  const BikeContext = createContext();

 const MyContext = ({children}) =>  {


 const [bikes , setBikes] = useState();
const [price , setPrice] = useState();


 useEffect(() => {


   async function getBike(){

      try {


         await axios.get('http://localhost:8000/bikes').then((res) => setBikes(res.data.bikes))
         await axios.get('http://localhost:8000/service/price').then(res => setPrice(res.data.price[0]))
        
             

      } catch (error) {
        console.log(error , 'context error')
      }

   }
   getBike();


  }, [])


  return (

    <BikeContext.Provider value = {{bikes , price , setPrice}} >

        {children}
        { console.log(price)}

    </BikeContext.Provider>

  )
}

export default MyContext

export const BikeState = () => {
 return useContext(BikeContext);
}