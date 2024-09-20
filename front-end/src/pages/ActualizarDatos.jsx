import React, { useEffect, useState } from 'react';
import { obtenerEmpleadoID, obtenerUsuarioIdEmpleado } from '../data/MockData';
import { useParams } from 'react-router-dom';
import '../styles/ActualizarDatos.css';

function ActualizarDatos() {
  // Estado inicial del objeto
  const {id} = useParams()
  const usuario = obtenerUsuarioIdEmpleado(id)[0];
  const [usuarioData, setUsuarioData] = useState(usuario);
  const empleado = obtenerEmpleadoID(id)[0];
  const [empleadoData, setEmpleadoData] = useState(empleado);
  const [passwords, setPasswords] = useState({
    currentPassword : "",
    newPassword : "",
    confirmPassword: "",
  });
  const [error, setError]= useState("");

  // Función para manejar los cambios en los inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Manejar los cambios en los campos de usuario
    if (name === 'name' || name === 'email') {
        setUsuarioData({
          ...usuarioData,
          [name]: value, // Actualiza solo la propiedad modificada en usuarioData
        });
      }
  
      // Manejar los cambios en los campos de contraseñas
      if (name === 'currentPassword' || name === 'newPassword' || name === 'confirmPassword') {
        setPasswords({
          ...passwords,
          [name]: value, // Actualiza solo la propiedad modificada en passwords
        });
      }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías hacer una llamada a la API para actualizar los datos
    console.log('Datos actualizados:', usuarioData);
    console.log('Contraseñas ingresadas', passwords);
    if(passwords.currentPassword){
        if(passwords.currentPassword === usuarioData.usuarioPassword){
            if(passwords.newPassword === passwords.confirmPassword){
                setError("");
                alert("Contraseña actualizada");
            }else{
                setError("Las contraseñas no coinciden.");
            }
        }else{
            setError("La contraseña actual no es valida.");
        }
    }
    
  };
  

  return (
    <div>
      <h2>Actualizar Datos</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input 
            type="text" 
            name="name" 
            value={usuarioData.name} 
            onChange={handleInputChange} 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={usuarioData.email} 
            onChange={handleInputChange} 
          />
        </div>
        <div>
          <h2>Actualizar contraseña</h2>
          { error ? (
            <h3 className='error'>Error: {error} </h3>
          ): (<></>)}
          <label>Ingrese la contraña actual:</label>
          <input 
            type="text" 
            name="currentPassword" 
            value={passwords.currentPassword} 
            onChange={handleInputChange} 
          />
        </div>
        <div>
            <label>Ingrese la nueva contraseña:</label>
            <input
                type='text'
                name='newPassword'
                value={passwords.newPassword}
                onChange={handleInputChange}
            />
        </div>
        <div>
            <label>Confirme la contraseña:</label>
            <input
                type="text"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleInputChange}
            />
        </div>
        <div>
          <h2>Actualizar datos del empleado</h2>
          
          <div>
            <label htmlFor='opcion'>Area</label>
            <select
                className="select-datos"
                id="opcion"
                value={empleadoData.Area}
                onChange={handleInputChange}>
                <option value={empleadoData.Area}>{empleadoData.Area}</option>
                <option value="Marketing">Marketing</option>
                <option value="Operaciones">Operaciones</option>
                <option value="Contabilidad">Contabilidad</option>
            </select>
            </div>
            <div>
                <label>Puesto</label>
                <input
                    type='text'
                    name="puesto"
                    value={empleadoData.puesto}
                    onChange={handleInputChange}
                />
            </div>
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default ActualizarDatos;
