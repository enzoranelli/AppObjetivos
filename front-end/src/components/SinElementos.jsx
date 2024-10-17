import '../styles/SinElementos.css';

function SinElementos({elemento}){
    
    return(
        <div className="contenedor-sinElementos">
            <h2>No se encontraron {elemento}</h2>
        </div>
    );

}

export default SinElementos;