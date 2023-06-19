import React, { useState } from 'react'
import "../profile/Profile.css"
import Mininav from '../../components/Navigation/Mininav'

const Profile = () => {

const[image , setImage] = useState('');

function handleChange(e){
    setImage(e.target.files[0]);
}

function upload(){
    const formData = new FormData()
    formData.append('image' , image)
    axios.post(url , formData).then(res => console.log('image uploading ',res))
}

  return (
    <div>

<Mininav />

<div className='user-detail'>
    <div className='profile-pic'>
        <input type='file' onChange={handleChange} />
        <button onClick={upload}> UPLOAD </button>

    </div>




    <div className='profile-detail'></div>
</div>













    </div>
  )
}

export default Profile