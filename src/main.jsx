import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/login.jsx'
import Register from './pages/Register.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import Riderreg from './pages/Riderreg.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
      path:"/",
      element:<Home/>
    },
      {
      path:"login",
      element:<Login/>
    },
      
      {
      path:"Register",
      element:<Register/>
    },
      {
      path:"adminpanel",
      element:<AdminPanel/>
    },
      {
      path:"riderregister",
      element:<Riderreg/>
    },
      {
      path:"*",
      element:<h1>Not Found</h1>
    },
  ]  
  }
])

createRoot(document.getElementById('root')).render(
  
  <RouterProvider router={router}>
      <StrictMode>
    <App />
  </StrictMode>
  </RouterProvider>,
)

 

