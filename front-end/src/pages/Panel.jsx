import ObjetivoPanel from "../components/ObjetivoPanel";
import { useState, useEffect } from "react";
import axios from 'axios';
import SinElementos from "../components/SinElementos";
import { getApiUrl } from "../config/configURL";
import Paginacion from "../components/Paginacion";
import Filtros from "../components/Filtros";

function Panel(){
    const [objetivos, setObjetivos] = useState(null);
    const [objetivosFiltrado, setObjetivosFiltrados] = useState(null);
    const [error, setError]  =useState(null);
    const [cantidadObjetivos, SetCantidadObjetivos] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const url = getApiUrl();
    
    const handleListaFiltrada = (listaNueva)=>{
        setObjetivosFiltrados(listaNueva);
    }
    useEffect(()=>{
        axios.get(`${url}/api/objetivos`)
            .then( response => {
                console.log(response)
                setObjetivos(response.data);
                setIsLoading(false);
            })
            .catch( error => {
                setError(error.message);
                setIsLoading(false);
            });
        
            console.log(objetivos)
    },[]);

    const indexFin = currentPage * cantidadObjetivos;
    const indexIni = indexFin - cantidadObjetivos;
    const nObjetivos = objetivos ? objetivos.slice(indexIni,indexFin) : [];
    const nPages = objetivos ?  Math.ceil(objetivos.length / cantidadObjetivos) : 0;


    return (
        <div>
            {error && <p>Error : {error}</p>}
            {isLoading ? (
                <p>Cargando ...</p>
            ): (
                <>
                    <h1 className="titulo">Lista de objetivos</h1>
                    <hr className="linea"></hr>
                    {nObjetivos && nObjetivos.length !== 0 ?  (
                        <>
                            <Filtros manejarLista={handleListaFiltrada} />
                            <ul className="lista">
                                {nObjetivos.map((objetivos,index)=>(
                                    <li key={index}>
                                        <ObjetivoPanel objetivo={objetivos}/>
                                    </li>
                                ))}
                            </ul>
                            <Paginacion 
                                currentPage={currentPage} 
                                setCurrentPage={setCurrentPage}
                                nPages={nPages}    
                            />
                        </> ) : (
                    <SinElementos elemento='objetivos'/>
                    )}
                   
                </>
            )

            }
           
            
        </div>

    );
}

export default Panel;