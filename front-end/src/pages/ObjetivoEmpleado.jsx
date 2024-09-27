import '../styles/ObjetivoEmpleado.css';
import placeholderporcentaje from '../images/placeholder-porcentaje.png';
function ObjetivoEmpleado(){
    return (
        <div className="container-objetivo-empleado">
            <div className='cuadrado'>
                <h1>Enzo Ranelli</h1>
                <hr></hr>
                <h2>Fecha final de objetivo: 10/10/24</h2>
                <div>
                    <button className='boton-obj-emp'>Actualizar estado</button>
                    <button className='boton-obj-emp-eli'>Eliminar del objetivo</button>
                </div>
                
                <h3>Historial de Enzo Ranelli en el objetivo:</h3>
                <ul>
                    <li>
                        <ul>
                            <li>Fecha: 19/09/24</li>
                            <li><progress id="progreso" value="30"  max="100"></progress> 30%</li>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <li>Fecha: 01/09/24</li>
                            <li><progress id="progreso" value="0"  max="100"></progress> 0%</li>
                        </ul>
                    </li>
                </ul>
                <img className="logo" src={placeholderporcentaje}
                alt="Logo AG"/>
            </div>
        </div>

    );
}

export default ObjetivoEmpleado;