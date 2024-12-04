import axios from 'axios';
import { useState, useEffect } from "react";
function Filtros(){
    const [filtros, setFiltros] = useState({
        anioActual: false,
        area: false,
        noAsignados: false,
        hardware: false,
        documentacion: false
    });
    useEffect(()=>{
        axios.get(`${url}/api/objetivos/objetivo-con-asignacion`)
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

    return(
        <div className='contenedor-filtros'>
            <div>
                <label>
                    <input 
                        type='checkbox'
                        name='Año actual'
                        checked
                    />
                </label>
            </div>
        </div>
    );
}

export default Filtros;