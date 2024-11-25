import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../config/firbase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Home = () => {
  const Navigate = useNavigate()
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        Navigate("/riderregister")
        const uid = user.uid;
      return
      } 
    });
  },[])
  
  
  return (
    < >
    <div  className='flex justify-around items-center font-bold bg-green-700 py-2 text-white'>
    <h1 className='text-3xl'>InDrive Registeration App</h1>
    <button className='btn btn-white'><Link to="/login">login</Link></button>
    </div>
    <div className='flex justify-center flex-col gap-5 items-center h-[90vh]'>
        <h1 className='text-5xl font-semibold'>Welcome to Bykea Registeration App.</h1>
        <h1 className='text-3xl font-semibold'>Login first For Register yourself!</h1>
    </div>
        </>
  )
}

export default Home