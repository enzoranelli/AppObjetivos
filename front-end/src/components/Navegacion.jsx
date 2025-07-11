import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext, useUserToggleContext } from "../context/UserProvider.jsx";

const Navegacion = () => {
  const {user} = useUserContext();
  const {logout} = useUserToggleContext();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-custom-orange px-5 py-2 shadow-md text-white rounded-bl-xl JosefinSans">
      <nav>
        <ul className="flex justify-around list-none m-0 p-0">
          {
            (user && user.rol === 'admin') ? (
              <>
              <li><Link to="/nuevo-objetivo" className='nav-links'>Crear nuevo Objetivo/Certificacion</Link></li>
              <li><Link to="/nuevoUsuario" className='nav-links'>Crear Usuario</Link></li>
              <li><Link to="/panel" className='nav-links'>Panel</Link></li>
              <li><Link to="/empleados" className='nav-links'>Empleados</Link></li>
              </>
            ):(
              <></>
            )
          }
          
          {
            user ? (
              <li onClick={logout} ><a className='cursor-pointer nav-links'> Cerrar sesión</a></li>
            ) : (
              <li><Link to="/" className='nav-links'>Login</Link></li>   
            )
          }
        </ul>
      </nav>
    </header>
  );
}

export default Navegacion;