import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import {Home, MoreAstros} from './pages';

const App = () => {
  return (
    <Router>
      <main className='bg-black min-h-screen'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/moreastros' element={<MoreAstros/>}/>
        </Routes>
      </main>
    </Router>
  )
}

export default App