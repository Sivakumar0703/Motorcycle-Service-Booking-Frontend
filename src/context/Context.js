import React ,{createContext,useState,useEffect,useContext} from 'react'
import axios from 'axios'


export  const BikeContext = createContext();

 const MyContext = ({children}) =>  {


 const [bikes , setBikes] = useState();



 useEffect(() => {


   async function getBike(){

      try {


         await axios.get('http://localhost:8000/bikes').then((res) => setBikes(res.data.bikes))
        
              

      } catch (error) {
        console.log(error , 'context error')
      }

   }
   getBike();


  }, [])



  return (

    <BikeContext.Provider value = {{bikes}} >

        {children}

    </BikeContext.Provider>

  )
}

export default MyContext

export const BikeState = () => {
 return useContext(BikeContext);
}