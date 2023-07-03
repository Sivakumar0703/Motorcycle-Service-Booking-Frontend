import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TextField } from '@mui/material'
import '../admin/Admin.css'
import { toast } from 'react-toastify'
import Adminnav from './Adminnav'

const AdminAddBikes = () => {

    // adding new bike
    const [bikeCompany, setBikeCompany] = useState('');
    const [model, setModel] = useState('');
    const [cc, setCc] = useState('');
    const [image, setImage] = useState('');




    async function savedata() {

        const newBike = {
            bikeCompany,
            model,
            cc,
            image
        }

        try {
            await axios.post('http://localhost:8080/bikes/addbike', newBike).then(res => res.data.message === 'bike added successfully' ? toast.success('Bike added successfully') : toast.error('Adding New Bike Failed'))
           // window.location.reload(true)
        } catch (error) {
            console.log('error in adding new bike', error);
        }
        setBikeCompany('');
        setModel('');
        setCc('');
        setImage('');

    }













  return (
    <div>
        <Adminnav />

<div className='add-new-bike'>
                <p className='add-bike-heading'> ADD NEW BIKE HERE</p>
                <TextField className="mb-3 mt-3" label="Bike Company" variant="outlined" color="secondary" value={bikeCompany} onChange={(e) => setBikeCompany(e.target.value)} style={{ width: "300px" }} />
                <TextField className="mb-3" label="Model" variant="outlined" color="secondary" value={model} onChange={(e) => setModel(e.target.value)} style={{ width: "300px" }} />
                <TextField className="mb-3" label="Bike CC" variant="outlined" color="secondary" value={cc} onChange={(e) => setCc(e.target.value)} style={{ width: "300px" }} />
                <TextField className="mb-3" label="Image Link" variant="outlined" color="secondary" value={image} onChange={(e) => setImage(e.target.value)} style={{ width: "300px" }} />
                <button className="mb-5 btn btn-primary" color="secondary" onClick={() => savedata()}> SAVE </button>
            </div>





    </div>
  )
}

export default AdminAddBikes