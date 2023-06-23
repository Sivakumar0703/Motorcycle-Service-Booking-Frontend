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
//const[length , setLength] = useState();

    useEffect(()=>{
        async function getData(){
            const bookingInfo = await axios.get('http://localhost:8000/bookings').then(res => {
                setInfo(res.data.bookings)
              // setLength(info?.length)
             //  setLength(res.data.bookings.length)
               console.log(info , 'inside get info data from backend')
               countMonth(res.data.bookings);
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
            if(data[j].serviceDate?.split('/')[1] === months[i]){
                count++;
                console.log(data[j].serviceDate?.split('/')[1] , months[i])
            }
        }
        booking_data.push(count);
        
        console.log('************' , count)   
    }

}











// chart
const data = {
    labels : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets:[{
        labels:'service from the beginning',
        data:[10,20,15,25,19,60,40,15,5,90,25,36],
        pointBorderColor:'red',
        backgroundColor: '#9BD0F5',
        borderColor: 'violet',
        fill:true,
        tension:0.1
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
    <div style={{width:'800px',height:'500px'}}>Linechart {console.log(booking_data)}

    {console.log(booking_data)}
    
  

        <Line
        data = {data}
        options={options}
        >

        </Line>


    </div>
  )
}

export default Linechart