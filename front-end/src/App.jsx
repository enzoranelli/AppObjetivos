import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navegacion from './components/Navegacion.jsx';

import Login from './pages/Login';
import NuevoUsuario from './pages/NuevoUsuario.jsx';
import Feed from './pages/Feed.jsx';
import Panel from './pages/Panel.jsx';
import Empleados from './pages/Empleados.jsx';

import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { useUserContext } from './UserProvider.jsx';
import NuevoObjetivo from './pages/NuevoObjetivo.jsx';
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
            <Route path='/feed/:id' element={<Feed />}/>      
          </Route>
          <Route element={<ProtectedRoute isAllowed={!!user && user.rol === 'admin'}/>}>
            <Route path='/panel' element={<Panel />}/>
            <Route path='/empleados' element={<Empleados />}/>
            <Route path="/nuevo-objetivo" element={<NuevoObjetivo />}/>
            <Route path="/nuevoUsuario" element={<NuevoUsuario />}/>
          </Route>
          </Routes>
      </div>
      
    </Router>
    
  );
}

export default App;
