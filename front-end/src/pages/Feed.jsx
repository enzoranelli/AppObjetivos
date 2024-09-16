import Objetivo from "../components/Objetivo";
import "../styles/Feed.css";

function Feed(){

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
            <h1>Objetivos asignados ((de 'Juan Perez'))</h1>
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