import {BrowserRouter , Route , Routes} from 'react-router-dom' ;
import Header from './components/Header/Header';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Carousell from './components/Carousel/Carousel';
import Homepage from './routes/homepage/Homepage';
import Footer from './components/Footer/Footer';
// import Service from './routes/Service/Service';
import Register from './routes/Register/Register';
import Login from './routes/login/Login';
import Navbar from './components/Navbar/Navbar';
import CollapsibleExample from './components/Navbar/Nav';
import Repair from './routes/repair/Repair';
import Washing from './routes/wash/Washing';
import Mininav from './components/Navigation/Mininav';
import Profile from './routes/profile/Profile';
import Admin from './routes/admin/Admin';
import AdminPrice from './routes/admin/AdminPrice';
import Services from './routes/Service/Services';
import Booking from './components/Booking/Booking';
import Linechart from './components/Chart/Linechart';
import DoughnutChart from './components/Chart/Doughnut';
import Adminnav from './routes/admin/Adminnav';
import AdminAddBikes from './routes/admin/AdminAddBikes';
import Dashboard from './routes/admin/Dashboard';
import Contact from './routes/Contact/Contact';
import Slider from './components/Slider/Slider';

function App() {
  return (
    <div className="App">

      <BrowserRouter> <Routes>
      
      {/* <Route path='/' element={< Header />} /> */}
      {/* <Route path='/' element={< Carousell />} /> */}
      <Route path='/' element={< Homepage />} />
      {/* <Route path='/' element={<Footer />} /> */}
      {/* <Route path='/service' element={<Service />} /> */}
      <Route path='/service' element={<Services />} />
      <Route path='/signup' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/nav' element={<CollapsibleExample />} />
      <Route path='/repair' element={<Repair />} />
      <Route path='/washing' element={<Washing />} />
      <Route path='/navie' element={<Mininav />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/admin/bookings' element={<Admin />} />
      <Route path='/admin/price' element={<AdminPrice />} />
      <Route path='/booking' element={<Booking/>} />
      <Route path='/chart' element={<Linechart />} />
      <Route path='/chart2' element={<DoughnutChart />} />
      <Route path='/adminnav' element={<Adminnav />} />
      <Route path='/admin/add/bikes' element={<AdminAddBikes />} />
      <Route path='/admin/dashboard' element={<Dashboard />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/slider' element={<Slider />} />

      
      
      
      
      
      
      
      
      
      </Routes> </BrowserRouter>
 

    </div>
  );
}

export default App;
