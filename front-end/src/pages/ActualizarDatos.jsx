import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ActualizarDatos.css';
import axios from 'axios';

function ActualizarDatos() {
  // Estado inicial del objeto
  const { id } = useParams()

  const [usuarioData, setUsuarioData] = useState(null);
  const [empleado, setEmpleado] = useState(null);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // Función para manejar los cambios en los inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Manejar los cambios en los campos de usuario
    if (name === 'name' || name === 'email' || name === 'rol') {
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

    if (name === 'area' || name === 'puesto' || name === 'nombre') {
      setEmpleado({
        ...empleado,
        [name]: value, // Actualiza solo la propiedad modificada en empleado
      });
    };
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías hacer una llamada a la API para actualizar los datos
    console.log('Datos actualizados:', usuarioData);
    console.log('Contraseñas ingresadas', passwords);
    if (passwords.currentPassword) {
      if (passwords.currentPassword === usuarioData.usuarioPassword) {
        if (passwords.newPassword === passwords.confirmPassword) {
          setError("");
          alert("Contraseña actualizada");
        } else {
          setError("Las contraseñas no coinciden.");
        }
      } else {
        setError("La contraseña actual no es valida.");
      }
    }

  };

  useEffect(() => {
    axios.get(`http://localhost:9000/api/empleados/${id}`)
      .then(response => {
        console.log(response)
        setEmpleado(response.data);

      })
      .catch(error => {
        setError(error.message);
      });
    axios.get(`http://localhost:9000/api/usuarios/${id}`)
      .then(response => {
        console.log(response)
        setUsuarioData(response.data);

      })
      .catch(error => {
        setError(error.message);
      });
  }, [id]);


  return (
    <div className='form-contenedor'>
      {usuarioData && empleado ? (
        <form onSubmit={handleSubmit}>
          <h2>Actualizar Datos</h2>
          <div className='contenedor-input'>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={empleado.nombre}
              onChange={handleInputChange}
            />
          </div>
          <div className='contenedor-input'>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={usuarioData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className='contenedor-input'>
            <label><b>Cambiar rol:</b></label>
            <div className="contenedor-radio">
              <label className="label-radio">
                <input
                  className="input-radio"
                  type="radio"
                  value="admin"

                />
                Sí
              </label>

              <label className="label-radio">
                <input
                  className="input-radio"
                  type="radio"
                  value="user"

                />
                No
              </label>
            </div>
          </div>
          <div className='contenedor-input'>
            <h2>Actualizar contraseña</h2>
            {error ? (
              <h3 className='error'>Error: {error} </h3>
            ) : (<></>)}
            <label>Ingrese la contraña actual:</label>
            <input
              type="text"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className='contenedor-input'>
            <label>Ingrese la nueva contraseña:</label>
            <input
              type='text'
              name='newPassword'
              value={passwords.newPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className='contenedor-input'>
            <label>Confirme la contraseña:</label>
            <input
              type="text"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className='contenedor-input'>
            <h2>Actualizar datos del empleado</h2>

            <div className='contenedor-input'>
              <label htmlFor='opcion'>Area</label>
              <select
                className="select-datos"
                id="opcion"
                name='area'
                value={empleado.area}
                onChange={handleInputChange}>
                <option value={empleado.area}>{empleado.area}</option>
                <option value="Marketing">Marketing</option>
                <option value="Operaciones">Operaciones</option>
                <option value="Contabilidad">Contabilidad</option>
              </select>
            </div>
            <div className='contenedor-input'>
              <label>Puesto</label>
              <input
                type='text'
                name="puesto"
                value={empleado.puesto}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button type="submit">Guardar</button>
        </form>)
        :
        (
          <p>No se cargaron los datos...</p>
        )}
    </div>
  );
}

export default ActualizarDatos;
