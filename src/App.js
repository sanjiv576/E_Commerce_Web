// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SingleProduct from './components/SingleProduct';
import HomePage from './components/HomePage';
import Login from './components/Login';

import { AuthProvider } from './utils/authContext';
import { RequireAuth } from './utils/RequireAuth';
import { PurchaseProvider } from './utils/purchaseContext';

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
        <PurchaseProvider>
          <Routes>
            <Route path='/' element={<LandingPage />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/singleProduct/:productId' element={<SingleProduct />}></Route>
            <Route path='/home' element={<RequireAuth> <HomePage /> </RequireAuth>}></Route>
          </Routes>
        </PurchaseProvider>
      </AuthProvider>


    </div>
  );
}

export default App;
