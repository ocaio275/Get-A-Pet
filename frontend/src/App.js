import { BrowserRouter, Route, Routes } from 'react-router-dom'

/* Components */
import Navbar from './components/layouts/Navbar'
import Footer from './components/layouts/Footer'
import Container from './components/layouts/Container'
import Message from './components/layouts/Message'

/*Páginas */
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'

/**Context */
import { UserProvider } from './context/UserContext'


function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
