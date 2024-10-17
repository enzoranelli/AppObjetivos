import { useState } from 'react';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';


function Confirmacion({ idElemento, idEmpleado }) {
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
  };

  if(redireccion){
    return <Navigate to={`/feed/${idEmpleado}`} />
  }
  return (
    <button onClick={manejarEliminar} style={{ backgroundColor: 'red', color: 'white' }}>
      Eliminar asignacion
    </button>
  );
}

export default Confirmacion;