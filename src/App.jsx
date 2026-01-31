import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import {AstroDetail, Home, MoreAstros} from './pages';

const App = () => {
  return (
    <Router>
      <main className='bg-black min-h-screen'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/moreastros' element={<MoreAstros/>}/>
          <Route path='/astros/:id' element={<AstroDetail/>}/>
        </Routes>
      </main>
    </Router>
  )
}

export default App
