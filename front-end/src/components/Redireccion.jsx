import {Link} from 'react-router-dom'
import '../styles/Redireccion.css'
function Redireccion(){
    return (
        <div className='contenedor-redireccion'>
            <div className='cartel'>
            <div className='contenedor-check'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 60 60">
                <defs><style>
                </style>
                </defs>
                <path class="cls-1" d="M800,510a30,30,0,1,1,30-30A30,30,0,0,1,800,510Zm-16.986-23.235a3.484,3.484,0,0,1,0-4.9l1.766-1.756a3.185,3.185,0,0,1,4.574.051l3.12,3.237a1.592,1.592,0,0,0,2.311,0l15.9-16.39a3.187,3.187,0,0,1,4.6-.027L817,468.714a3.482,3.482,0,0,1,0,4.846l-21.109,21.451a3.185,3.185,0,0,1-4.552.03Z" id="check" transform="translate(-770 -450)"/></svg>
                <h1 className='green-text'>Objetivo agregado con éxito</h1>
            </div>
            <h2 className='green-text'>¿Que te gustaria hacer ahora?</h2>
            <ul className='lista-redireccion'>
                <li className='punto'>
                <Link to="/nuevo-objetivo" className='link-verde'>Crear otro objetivo nuevo.</Link>
                </li>
                <li className='punto'>
                <Link to="/asignar-objetivo" className='link-verde'>Asignar objetivos a empleados.</Link>
                </li>
            </ul>
            </div>
        </div>
    );
}

export default Redireccion;