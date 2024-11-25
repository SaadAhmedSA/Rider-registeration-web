import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useRef } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import { auth } from '../config/firbase/firebase'
import Swal from 'sweetalert2'
const Register = () => {
  const Navigate = useNavigate()
    const email = useRef()
    const password = useRef()
    const register = (event)=>{
      event.preventDefault()
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    Swal.fire("Account Created Successfully");
   Navigate("/login")
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      });
  });
    }
  return (
    <>
     <div  className='flex justify-around items-center font-bold bg-green-700 py-2 text-white'>
    <h1 className='text-3xl'>InDrive Registeration App</h1>
    </div>
    <div className='flex justify-center items-center h-[90vh]'>

<div className='p-10 bg-green-300 rounded-lg text-center '>
  <h1 className=' text-2xl font-semibold'>Register</h1>
 <form onSubmit={register} >
 <label className="input input-bordered flex items-center gap-2 my-3">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
  <input type="text" className="grow" placeholder="Username" required/>
</label>
 <label className="input input-bordered flex items-center gap-2 my-3">
<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 16 16"
fill="currentColor"
className="h-4 w-4 opacity-70">
<path
d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
<path
d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
</svg>
<input type="text" className="grow" placeholder="Email" ref={email} required/>
</label>
<label className="input input-bordered flex items-center gap-2 my-3">

<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 16 16"
fill="currentColor"
className="h-4 w-4 opacity-70">
<path
fillRule="evenodd"
d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
clipRule="evenodd" />
</svg>
<input type="password" className="grow" placeholder='password' ref={password} required />
</label>
<button className='btn btn-primary'>Submit</button>
<Link to="/login"><p className='text-lg underline'>Already a user?</p></Link>

 </form>
</div>
</div>
    </>
  )
}

export default Register