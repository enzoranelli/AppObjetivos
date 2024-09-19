import Objetivo from "../components/Objetivo";
import "../styles/Feed.css";
import { useUserContext, useUserToggleContext } from "../UserProvider";
import { useEffect } from "react";
function Feed(){

    const user = useUserContext();
 
    const objetivos = [{
        titulo: "Certificaciones",
        fecha: "12/09/2024",
        descripcion: "El proposito de este objetivo es plasmar si el usuario completo certificaciones.",
        valor: "50"
    },
    {
        titulo: "Programación",
        fecha: "13/09/2024",
        descripcion: "Desarrollar aplicación.",
        valor: "13"
    }]

   
    return(
        <div>
            {user && user.rol === 'admin' ? (
            <h1>Objetivos asignados de {user.name}</h1>
            ) : (
            <h1>Tus objetivos asignados</h1>
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