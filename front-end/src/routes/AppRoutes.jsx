import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import Login from '../pages/Login';
import ObjetivoEmpleado from '../pages/ObjetivoEmpleado';
import CuentaDeshabilitada from '../pages/CuentaDeshabilitada';
import ContenedorFeed from '../components/contenedorFeed';
import Panel from '../pages/Panel';
import Empleados from '../pages/Empleados';
import NuevoItem from '../pages/NuevoItem';
import NuevoUsuario from '../pages/NuevoUsuario';
import ActualizarDatos from '../pages/ActualizarDatos';
import AsignarObjetivo from '../pages/AsignarObjetivo';
import ActualizarPuntuacion from '../pages/ActualizarPuntuacion';
import ActualizarObjetivo from '../pages/ActualizarObjetivo';
import Redireccion from '../components/Redireccion';
import AsignarCertificacion from '../pages/AsignarCertificacion';
import ActualizarEstadoCertificacion from '../pages/ActualizarEstadoCertificacion';
import CertificacionEmpleado from '../pages/CertificacionEmpleado';
import ActualizarCertificacion from '../pages/ActualizarCertificacion';

export function AppRoutes({ user }) {
  return (
    <Routes>
     
      <Route path="/" element={<Login />} />
      
     
      <Route element={<ProtectedRoute isAllowed={user} />}>
        <Route path="/feed/:tipo/:id" element={<ContenedorFeed />} />
        <Route path="/objetivo-empleado/:asignacion/:empleado/:objetivo" element={<ObjetivoEmpleado />} />
        <Route path="/cuenta-deshabilitada" element={<CuentaDeshabilitada />} />
      </Route>
    
      <Route element={<ProtectedRoute isAllowed={user && user.rol === 'admin'} />}>
        <Route path="/panel" element={<Panel />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/nuevo-objetivo" element={<NuevoItem />} />
        <Route path="/nuevoUsuario" element={<NuevoUsuario />} />
        <Route path="/actualizar-usuario/:id" element={<ActualizarDatos />} />
        <Route path="/asignar-objetivo/:id" element={<AsignarObjetivo />} />
        <Route path="/actualizar-puntuacion/:asignacion/:empleado/:objetivo/:trimestre" element={<ActualizarPuntuacion />} />
        <Route path="/actualizar-objetivo/:id" element={<ActualizarObjetivo />} />
        <Route path="/redireccion/:tipo/:aux?" element={<Redireccion />} />
        <Route path="/asignar-certificacion/:id" element={<AsignarCertificacion />} />
        <Route path="/actualizar-estado-certificacion/:asignacion/:empleado/:certificacion" element={<ActualizarEstadoCertificacion />} />
        <Route path="/certificacion-empleado/:asignacion/:empleado/:certificacion" element={<CertificacionEmpleado />} />
        <Route path="/actualizar-certificacion/:id" element={<ActualizarCertificacion />} />
      </Route>
    </Routes>
  );
}