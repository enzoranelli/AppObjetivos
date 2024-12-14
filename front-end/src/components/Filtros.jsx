import axios from 'axios';
import { useState, useEffect } from "react";
import { getApiUrl } from '../config/configURL';
import '../styles/Filtros.css';
function Filtros(){
    const url = getApiUrl();
    const [filtros, setFiltros] = useState({
        anioActual: false,
        area: false,
        noAsignados: false,
        hardware: false,
        documentacion: false
    });
    const [objetivos, setObjetivos] = useState(null);
    const [error,setError] = useState('');
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
                <h3>Filtros:</h3>
                <label>
                    <input 
                        className='input-filtros'
                        type='checkbox'
                        name='Año actual'
                
                    />
                    Año actual
                </label>
                <label>
                    <input 
                        className='input-filtros'
                        type='checkbox'
                        name='Año actual'
                
                    />
                    Año actual
                </label>
            </div>
        </div>
    );
}

export default Filtros;