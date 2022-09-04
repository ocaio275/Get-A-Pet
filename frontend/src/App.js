import { BrowserRouter, Route, Routes } from 'react-router-dom'
/*Páginas */
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={ <Login />} />
        <Route path='/register' element={ <Register/> } />
        <Route path='/' element={ <Home/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
