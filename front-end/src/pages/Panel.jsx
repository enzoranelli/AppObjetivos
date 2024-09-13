import ObjetivoPanel from "../components/ObjetivoPanel";
function Panel(){
    const objetivos = {
        titulo: "Certificaciones",
        fecha: "12/09/2024",
        descripcion: "El proposito de este objetivo es plasmar si el usuario completo certificaciones.",
        valor: "50"
    }

    return (
        <div>
            <h1>Lista de objetivos</h1>
            <ObjetivoPanel objetivo={objetivos} />
            
        </div>

    );
}

export default Panel;