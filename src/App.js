// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SingleProduct from './components/Product/SingleProduct';
import HomePage from './components/User/HomePage';
import Login from './components/Auth/Login';

import { AuthProvider } from './utils/authContext';
import { RequireAuth } from './utils/RequireAuth';
import { PurchaseProvider } from './utils/purchaseContext';
import AdminProfile from './components/Admin/AdminProfile';
import { UserProvider } from './utils/userContext';
import Signup from './components/Auth/Signup';
import { Contact } from './components/Guest/Contact';
import { About } from './components/Guest/About';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <AuthProvider>
        <UserProvider>
          <PurchaseProvider>
            <Routes>
              <Route path='/' element={<LandingPage />}></Route>
              <Route path='/contact' element={<Contact />}></Route>
              <Route path='/about' element={<About />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/signup' element={<Signup />}></Route>
              <Route path='/singleProduct/:productId' element={<SingleProduct />}></Route>
              <Route path='/home' element={<RequireAuth> <HomePage /> </RequireAuth>}></Route>
              <Route path='/adminProfile' element={<RequireAuth> <AdminProfile /> </RequireAuth>}></Route>
            </Routes>
          </PurchaseProvider>
        </UserProvider>
      </AuthProvider>


    </div>
  );
}

export default App;
