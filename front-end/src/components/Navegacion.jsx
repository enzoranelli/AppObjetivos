import React from 'react';
import '../styles/Header.css'; // 
import { Link } from 'react-router-dom';
const Navegacion = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/nuevoUsuario">Crear Usuario</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navegacion;