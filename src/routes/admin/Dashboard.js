import React, { useState } from 'react'
import axios from 'axios';
import Linechart from '../../components/Chart/Linechart'
import DoughnutChart from '../../components/Chart/Doughnut'
import Table from 'react-bootstrap/Table';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { BikeState } from '../../context/Context';
import '../admin/Admin.css'
import Adminnav from './Adminnav';

const Dashboard = () => {

    const [search, setSearch] = useState('');

    const { bikes } = BikeState();


    // deleting bike data
    function deleteData(data) {
        const id_number = data._id;
        try {
            axios.delete(`http://localhost:8080/bikes/delete/${id_number}`)
            window.location.reload(true)

        } catch (error) {
            console.log('error in deleting bike data', error)
        }
    }


    return (
        <>
            <Adminnav />
            <div className='container'>

            <div className='linechart'>
                <p>MONTHLY SERVICE BOOKING RECORD (* all the services are taken into account) </p>
                <Linechart />
            </div>


            <div className='bike-table'>
                <p>BIKES AND MODELS THAT ARE AVAILABLE FOR SERVICE/REPAIR IN OUR GARAGE</p>
                <div className='search-bar'>
                    <input type='search' placeholder='Search here...' value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <Table striped responsive className='mb-3 mt-3 '>
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
            </div>



            <div className='doughnutchart'>
                <p>FIND MORE ABOUT OUR SERVICE HERE</p>
                <p>TAKE A LOOK ABOUT OUR SERVICES.EASY TO NOTICE WHICH SERVICE IS NEEDED THE MOST </p>
                <DoughnutChart />
            </div>





            {/* <div className='search-bar'>
            <h3>SERVICES WE PROVIDE FOR</h3>
                <input type='search' placeholder='Search here...' value={search} onChange={e => setSearch(e.target.value)} />
            </div> */}










        </div >
        </>
     
    )
}

export default Dashboard