import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navegacion from './components/Navegacion.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import NuevoUsuario from './pages/NuevoUsuario.jsx';
import Feed from './pages/Feed.jsx';
import Panel from './pages/Panel.jsx';
import Usuarios from './pages/Usuarios.jsx';

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
          <Route path='/panel' element={<Panel />}/>
          <Route path='/usuarios' element={<Usuarios />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
