import './App.css'
import { useState , useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import Home from './Pages/Home'
import Products from './Pages/Products'
import Cart from './Pages/Cart'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Navbar from './Components/Navbar'
function App() {
 const [location, setLocation] = useState()
  const [openDropdown, setOpenDropdown] = useState(false)
  // const { cartItem, setCartItem } = useCart()

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords
       console.log(latitude, longitude);

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      try {
        const location = await axios.get(url)
        const exactLocation = location.data.address
        setLocation(exactLocation)
        setOpenDropdown(false)
         console.log(exactLocation);

      } catch (error) {
        console.log(error);

      }

    })
  }

  useEffect(() => {
    getLocation()
  }, [])
  return (
    <BrowserRouter>
    <Navbar location={location} getLocation={getLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}  />
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/About' element={<About/>}></Route>
      <Route path='/Products' element={<Products/>}></Route>
      <Route path='/Cart' element={<Cart/>}></Route>
      <Route path='/Contact' element={<Contact/>}></Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App
