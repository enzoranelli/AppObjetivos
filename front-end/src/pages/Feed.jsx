import Objetivo from "../components/Objetivo";


function Feed(){

    const objetivo = {
        titulo: "Certificaciones",
        fecha: "12/09/2024",
        descripcion: "El proposito de este objetivo es plasmar si el usuario completo certificaciones.",
        valor: "50"

    }
    return(
        <div>
            <h1>Objetivos asignados</h1>
            <Objetivo objetivo={objetivo}/>
        </div>
         

    );
}

export default Feed;