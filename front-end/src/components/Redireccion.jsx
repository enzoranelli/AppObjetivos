import {Link} from 'react-router-dom'
function Redireccion(){
    return (
        <div>
            <h1>Objetivo agregado con éxito</h1>
            <h2>¿Que te gustaria hacer ahora?</h2>
            <Link to="/nuevo-objetivo">Crear otro objetivo nuevo.</Link>
            <br></br>
            <Link to="/asignar-objetivo">Asignar objetivos a empleados.</Link>

        </div>
    );
}

export default Redireccion;