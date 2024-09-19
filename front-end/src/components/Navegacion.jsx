import React from 'react';
import '../styles/Header.css'; // 
import { Link } from 'react-router-dom';
import { useUserContext, useUserToggleContext } from "../UserProvider";

const Navegacion = () => {
  const user = useUserContext();
  const cambiaLogin = useUserToggleContext();

  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          {
            (user && user.rol === 'admin') ? (
              <>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/nuevoUsuario">Crear Usuario</Link></li>
              <li><Link to="/feed">Feed</Link></li>
              <li><Link to="/panel">Panel</Link></li>
              <li><Link to="/usuarios">Usuarios</Link></li>
              </>
            ):(
              <li><Link to="/feed">Feed</Link></li>
            )
          }
          
          {
            user ? (
              <li onClick={cambiaLogin} ><a> Logout</a></li>
            ) : (
              <li><Link to="/">Login</Link></li>   
            )
          }
        </ul>
      </nav>
    </header>
  );
}

export default Navegacion;