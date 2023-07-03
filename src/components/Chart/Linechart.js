import React, { useEffect , useState} from 'react'
import axios from 'axios'
import {Line} from 'react-chartjs-2'


import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    
    Filler
   
} from 'chart.js';


ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    
    Filler
)



const Linechart = () => {

const[info , setInfo] = useState()
const[bookings , setBookings] = useState([])
//const[length , setLength] = useState();

    useEffect(()=>{
        async function getData(){
            const bookingInfo = await axios.get('http://localhost:8080/bookings').then(res => {
                
              // setLength(info?.length)
             //  setLength(res.data.bookings.length)
              // console.log(info , 'inside get info data from backend')
              console.log('receive bookings')
               countMonth(res.data.bookings);
               setInfo(res.data.bookings)
               console.log('receive bookings ends')
            })
            

        }
        getData()
        
      
    },[])

//const months = [];
const months = ["01","02","03","04","05","06","07","08","09","10","11","12"];
const booking_data = [];


// for(let i=0;i<12;i++){
   
//     let count = 0;
//     info && info.map(i => {
       
//         if(i.serviceDate?.split('/')[1] === months[i]){
//            count++;
//            console.log(i.serviceDate?.split('/')[1] , months[i] )
          
//         } 
//     })
//     booking_data.push(count);
//     console.log('************')
// }

function countMonth(data){
    console.log('inside count function' , data)
    console.log('inside count function length' , data.length)

    for(let i=0;i<12;i++){

        let count = 0;
        const length = data.length;
    
        for(let j=0;j<length;j++){
            if(data[j].serviceDate.split('-')[1] === months[i]){
                count++;
                console.log('service date ',data[j].serviceDate.split('-')[1] , months[i])
            }
        }
       // booking_data.push(count);
        //bookings.push(count)
        setBookings((old) => [...old , count])
        console.log('************' , count)   
    }
     return 0;

}


// chart
const data = {
    labels : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets:[{
        label:'Number of Bookings',
        data:bookings,
        pointBorderColor:'red',
        backgroundColor: '#9BD0F5',
        borderColor: 'violet',
        fill:true,
        tension:0.4
    }]
}

const options = {
    plugins : {
        legend:true,     
    },
    colors: {
        enabled: true,
        forceOverride: true
    },  
    scales : {}
}


  return (
    info ? (
    <div style={{width:'800px',height:'500px'}}> {console.log('booking data ',booking_data)}

    {console.log('bookings ',bookings)}
    
  

        <Line
        data = {data}
        options={options}
        >

        </Line>


    </div>  ) : 'Loading...'
  )
}

export default Linechart