import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home/Home";
import Service from "./Pages/Service/Service";
import Gallery from "./Pages/Gallery/Gallery";
import Price from './Pages/Price/Price';
import Dashboard from './Admin/Pages/Dashboard/Dashboard';
import AdminService from './Admin/Pages/AdminService/AdminService';
import Banner from './Admin/Pages/Banner/Banner';
import Testimonial from './Admin/Pages/Testimonial/Testimonial';
import Gallery1 from './Admin/Pages/AdminGallry/Gallery';
import Contact1 from './Admin/Pages/AdminContact/Contact';



function App() {
  return (
    <BrowserRouter>  {/* Wrap the entire app inside BrowserRouter */} 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/price" element={<Price />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminService" element={<AdminService/>} />
        <Route path="/banners" element={<Banner/>} />
        <Route path='/testimonial' element={<Testimonial/>}/>
        <Route path='/galleryImage' element={<Gallery1/>} />
        <Route path='/adminContact' element={<Contact1/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
