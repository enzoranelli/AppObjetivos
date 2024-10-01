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
import ActualizarDatos from './pages/ActualizarDatos.jsx';
import ObjetivoEmpleado from './pages/ObjetivoEmpleado.jsx';
import Redireccion from './components/Redireccion.jsx';
import AsignarObjetivo from './pages/AsignarObjetivo.jsx';
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
            <Route path='/panel' element={<Panel />} />
            <Route path='/objetivo-empleado/:id' element={<ObjetivoEmpleado />}/>
            <Route path='/redireccion'element={<Redireccion />} />
            <Route path='/empleados' element={<Empleados />}/>
            <Route path="/nuevo-objetivo" element={<NuevoObjetivo />}/>
            <Route path="/nuevoUsuario" element={<NuevoUsuario />}/>
            <Route path='/actualizar-usuario/:id' element={<ActualizarDatos />}/>
            <Route path='/asignar-objetivo/:id' element={<AsignarObjetivo />} />
          </Route>
        </Routes>
      </div>
      
    </Router>
    
  );
}

export default App;
