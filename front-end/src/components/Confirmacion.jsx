import { useState } from 'react';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';


function Confirmacion({ idElemento, idEmpleado, tipo}) {
  const [redireccion, setRedireccion] = useState(false);
    const manejarEliminar = async () => {
    // Muestra la alerta de confirmación
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar esto después!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, ¡elimínalo!',
      cancelButtonText: 'Cancelar',
    });

    // Si el usuario confirma la eliminación
    if (result.isConfirmed) {
      if(tipo === 'asignacion'){
        try {
          // Realiza la petición para eliminar el elemento
          const response = await fetch(`http://localhost:9000/api/objetivoasignacion/${idElemento}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            // Muestra mensaje de éxito
            Swal.fire('¡Eliminado!', 'Tu elemento ha sido eliminado.', 'success');
            setRedireccion(true);
          } else {
            throw new Error('Error al eliminar el elemento');
          }
        } catch (error) {
          // Muestra mensaje de error
          Swal.fire('Error', error.message, 'error');
        }
      }
      if(tipo === 'empleado'){
        try {
          // Realiza la petición para eliminar el elemento
          const response = await fetch(`http://localhost:9000/api/empleados/${idEmpleado}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            // Muestra mensaje de éxito
            Swal.fire('¡Eliminado!', 'Tu elemento ha sido eliminado.', 'success');
            setRedireccion(true);
          } else {
            throw new Error('Error al eliminar el elemento');
          }
        } catch (error) {
          // Muestra mensaje de error
          Swal.fire('Error', error.message, 'error');
        }
      }
      if(tipo === 'objetivo'){
        try{
          const response = await fetch(`http://localhost:9000/api/objetivos/${idElemento}`, {
            method: 'DELETE',
          });

          if (response.ok) {
            // Muestra mensaje de éxito
            Swal.fire('¡Eliminado!', 'Tu elemento ha sido eliminado.', 'success');
            setRedireccion(true);
          } else {
            throw new Error('Error al eliminar el elemento');
          }
        } catch (error) {
          // Muestra mensaje de error
          Swal.fire('Error', error.message, 'error');
        }
      }
    }
  };

  if(redireccion){
    if(tipo === 'asignacion'){
      return <Navigate to={`/feed/${idEmpleado}`} />
    }
    if(tipo === 'empleado'){
      return <Navigate to={`/empleados`} />
    }
    if(tipo === 'objetivo'){
      return <Navigate to={`/panel`} />
    }
  }
  return (
    <button type="button"onClick={manejarEliminar} style={{ backgroundColor: 'red', color: 'white', width:'100%'}}>
      Eliminar {tipo}
    </button>
  );
}

export default Confirmacion;