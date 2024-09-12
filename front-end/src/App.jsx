import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navegacion from './components/Navegacion.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import NuevoUsuario from './pages/NuevoUsuario.jsx';
import Feed from './pages/Feed.jsx';

function App() {
  

  return (
    <Router>
      <div className='App'>
        <Navegacion />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/nuevoUsuario" element={<NuevoUsuario />}/>
          <Route path='/feed' element={<Feed />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
