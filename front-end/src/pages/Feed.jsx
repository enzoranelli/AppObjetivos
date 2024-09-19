import Objetivo from "../components/Objetivo";
import { obtenerEmpleadoID, obtenerObjetivosID } from "../data/MockData";
import "../styles/Feed.css";
import { useUserContext, useUserToggleContext } from "../UserProvider";
import { useParams } from 'react-router-dom';

function Feed(){

    const user = useUserContext();
    
    const {id} = useParams();
    


    const objetivos = obtenerObjetivosID(id);
    const empleado = obtenerEmpleadoID(id);
    
    return(
        <div>
            {user && user.rol === 'admin' ? (
            <h1>Objetivos asignados de {empleado[0].Nombre}</h1>
            ) : (
                <>
                    <h1>Bienvenido, {empleado[0].Nombre}</h1>
                    <h2>Tus objetivos asignados</h2>
                </>
            )}
            <ul className="lista">
                { objetivos.map((objetivo,index)=>(
                    <li key={index}>
                        {console.log(objetivo)}
                        <Objetivo objetivo={objetivo}/>
                    </li>
                ))}
            </ul>
            
        </div>
         

    );
}

export default Feed;