import { BrowserRouter, Route, Routes } from 'react-router-dom'

/* Components */
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'

/*Páginas */
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/login' element={ <Login />} />
        <Route path='/register' element={ <Register/> } />
        <Route path='/' element={ <Home/> } />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
