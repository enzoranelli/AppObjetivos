import ObjetivoPanel from "../components/ObjetivoPanel";
import { useState, useEffect } from "react";
import axios from 'axios';
import SinElementos from "../components/SinElementos";
import { getApiUrl } from "../config/configURL";
import Paginacion from "../components/Paginacion";
import Filtros from "../components/Filtros";

function Panel(){
    const [objetivos, setObjetivos] = useState(null);
    const [lista, setLista] = useState(null);
    const [error, setError]  =useState(null);
    const [cantidadObjetivos, SetCantidadObjetivos] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [nObjetivos, setNObjetivos] = useState([]);
    const [nPages, setNPages] = useState(0);
    const url = getApiUrl();
    
    const handleListaFiltrada = (listaNueva)=>{
        setLista(listaNueva);
        setCurrentPage(1);
        console.log(lista)
    }
    useEffect(()=>{
        axios.get(`${url}/api/objetivos`)
            .then( response => {
                console.log(response)
                setObjetivos(response.data);
                setLista(response.data);
                setIsLoading(false);
            })
            .catch( error => {
                setError(error.message);
                setIsLoading(false);
            });
        
            console.log(objetivos)
    },[]);

    useEffect(() => {
        if (lista) {
            const indexFin = currentPage * cantidadObjetivos;
            const indexIni = indexFin - cantidadObjetivos;
            setNObjetivos(lista.slice(indexIni, indexFin)); // Calcula la lista paginada
            setNPages(Math.ceil(lista.length / cantidadObjetivos)); // Calcula el número de páginas
        }
    }, [lista, currentPage, cantidadObjetivos]); 


    return (
        <div>
            {error && <p>Error : {error}</p>}
            {isLoading ? (
                <p>Cargando ...</p>
            ): (
                <>
                    <h1 className="titulo">Lista de objetivos</h1>
                    <hr className="linea"></hr>
                    <Filtros manejarLista={handleListaFiltrada} lista={objetivos} />
                    
                    {nObjetivos && nObjetivos.length !== 0 ?  (
                        <>
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