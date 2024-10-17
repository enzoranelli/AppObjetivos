import ObjetivoPanel from "../components/ObjetivoPanel";
import { useState, useEffect } from "react";
import axios from 'axios';
import SinElementos from "../components/SinElementos";

function Panel(){
    const [objetivos, setObjetivos] = useState(null);
    const [error, setError]  =useState(null);
    
    useEffect(()=>{
        axios.get('http://localhost:9000/api/objetivos')
            .then( response => {
                console.log(response)
                setObjetivos(response.data);
            })
            .catch( error => {
                setError(error.message);
            });
        
            console.log(objetivos)
    },[]);

    return (
        <div>
            {error && <p>Error : {error}</p>}
            <h1 className="titulo">Lista de objetivos</h1>
            <hr className="linea"></hr>
            {objetivos && objetivos.length !== 0 ?  (<ul className="lista">
                {objetivos.map((objetivos,index)=>(
                    <li key={index}>
                        
                        <ObjetivoPanel objetivo={objetivos}/>
                    </li>
                ))}
            </ul>) : (<SinElementos elemento='objetivos'/>)}
            
        </div>

    );
}

export default Panel;