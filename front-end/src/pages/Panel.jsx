import ObjetivoPanel from "../components/ObjetivoPanel";
import { useState, useEffect } from "react";
import axios from 'axios';

function Panel(){
    const [objetivos, setObjetivos] = useState(null);
    const [error, setError]  =useState(null);
    
    useEffect(()=>{
        axios.get('http://localhost:9000/api/objetivos')
            .then( response => {
       
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
            <h1>Lista de objetivos</h1>
            {objetivos ?  (<ul className="lista">
                { objetivos.map((objetivos,index)=>(
                    <li key={index}>
                        
                        <ObjetivoPanel objetivo={objetivos}/>
                    </li>
                ))}
            </ul>) : (<p>Cargando</p>)}
            
        </div>

    );
}

export default Panel;