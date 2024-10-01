import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function AsignarObjetivo(){
    const [objetivo, setObjetivo] = useState(null);
    const [error, setError]  =useState(null);
    const { id } = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:9000/api/objetivos/${id}`)
            .then( response => {
                console.log(response)
                setObjetivo(response.data);
            })
            .catch( error => {
                setError(error.message);
            });
        
            
    },[]);

    return (
        <div>
        {objetivo ? (
            <div>
                <h1>Objetivo: {objetivo.titulo}</h1>
                <form>
                    <label>Asignar a</label>
                    <select>
                        <option>Enzo Ranelli</option>
                    </select>
                    <button>Asignar</button>
                </form>
            </div>
        ):(
            <div>{error}</div>
        )}
        </div>
    );
}

export default AsignarObjetivo;