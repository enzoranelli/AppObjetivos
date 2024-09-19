import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navegacion from './components/Navegacion.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import NuevoUsuario from './pages/NuevoUsuario.jsx';
import Feed from './pages/Feed.jsx';
import Panel from './pages/Panel.jsx';
import Usuarios from './pages/Usuarios.jsx';

import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { useUserContext } from './UserProvider.jsx';
function App() {

  const user = useUserContext();
 
  return (
    <Router>
      <div className='App'>
        {
          user ? <Navegacion /> : <>
          </>
        }
      
       
        <Routes>
          <Route path="/" element={<Login />}/>
          
          <Route element={<ProtectedRoute isAllowed={user}/>}>
            
            <Route path='/feed' element={<Feed />}/>
            
          </Route>
          <Route element={<ProtectedRoute isAllowed={!!user && user.rol === 'admin'}/>}>
            <Route path='/panel' element={<Panel />}/>
            <Route path='/usuarios' element={<Usuarios />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/nuevoUsuario" element={<NuevoUsuario />}/>
          </Route>
          </Routes>
      </div>
      
    </Router>
    
  );
}

export default App;
