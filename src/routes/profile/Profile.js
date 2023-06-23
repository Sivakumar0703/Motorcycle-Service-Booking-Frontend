import React, { useState } from 'react'
import "../profile/Profile.css"
import Mininav from '../../components/Navigation/Mininav'
import axios from 'axios'

const Profile = () => {

const[image , setImage] = useState('');
const[imageName , setImageName] = useState('');
const url = 'http://localhost:8000/profilepic/uploadImage';
const email = JSON.parse(localStorage.getItem('user')).email;
console.log(email)

function handleChange(e){
    setImage(e.target.files[0]);
    setImageName(e.target.files[0].name)
    console.log(e , e.target.files[0].name)
}

const data = {
    image: image,
    imageName:imageName,
    email : email
}

function upload(){
    // const formData = new FormData(null)
    // formData.append('image' , image)
    // formData.append('email' , email)
    // formData.append('imageName' , imageName)
    console.log(data)
    axios.post(url , data).then(res => console.log('image uploading ',res))
}

  return (
    <div>

<Mininav />

<div className='user-detail'>
    <div className='profile-pic'>
        <input type='file' onChange={handleChange} /> <br/>
        <button onClick={upload}> UPLOAD </button>

    </div>




    <div className='profile-detail'></div>
</div>













    </div>
  )
}

export default Profile