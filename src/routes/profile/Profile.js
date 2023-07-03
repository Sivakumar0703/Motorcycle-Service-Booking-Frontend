import React, { useEffect, useState } from 'react'
import "../profile/Profile.css"
import Mininav from '../../components/Navigation/Mininav'
import axios from 'axios'

const Profile = () => {

const[image , setImage] = useState({});
const[imageName , setImageName] = useState('');
const[showImage , setShowImage] = useState();
const url = 'http://localhost:8080/profilepic/uploadImage';
const email = JSON.parse(localStorage.getItem('user')).email;
console.log(email)

function handleChange(e){
    setImage(e.target.files[0]);
    console.log('image',e.target.files[0])
    setImageName(e.target.files[0].name)
    console.log(e , e.target.files[0].name)
}

// const data = {
//     image: image,
//     imageName:imageName,
//     email : email
// }

async function upload(){
    const formData = new FormData()
    formData.append('file' , image)
    formData.append('email' , email)
    formData.append('imageName' , imageName)
     console.log('sent to backend',formData)
    await axios.post(url , formData).then(res => console.log('image uploading ',res))
}


useEffect(()=>{

    // async function getImage(){

    //   await  axios.get('http://localhost:8080/profilepic')
    //     .then(res => {
    //        setShowImage(res.data.image)
    //        console.log(res.data.image[0].image.data.data)
    //     })
    //     .catch((error) => console.log('show image error' , error))

    // }
    // getImage();
   
    
 
   // setShowImage

},[])













  return (
    <div>

<Mininav />

<div className='show-image'>
    <img src='' alt='profile-picture' />

</div>

<div className='user-detail'>
    <div className='profile-pic'>
        <input type='file' onChange={handleChange} /> <br/>
        <button onClick={upload}> UPLOAD </button>

    </div>

    { showImage &&
        showImage.map((i) => {
            const result = btoa(
                String.fromCharCode(...new Uint8Array(i.image.data.data))
            );
          
            console.log(i.image.data.data)
          return  <img src={`data:image/jpg;base64,${result}`} width="300" key={i._id} />
        })
    }




    <div className='profile-detail'></div>
</div>













    </div>
  )
}

export default Profile