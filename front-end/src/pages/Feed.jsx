import Objetivo from "../components/Objetivo";
import axios from 'axios';
import "../styles/Feed.css";
import SinElementos from "../components/SinElementos";
import { useUserContext} from "../UserProvider";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import BarraPeso from "../components/BarraPeso";
import { generarColorAleatorio } from "../components/generarColorAleatorio";
import BarraDesempeno from "../components/BarraDesempeno";
import { formateo } from "../components/formateo";
import DesempenoTotal from "../components/DesempenoTotal";
function Feed(){

    const user = useUserContext();
    const {id} = useParams();
    
    const [objetivos, setObjetivos] = useState(null); 
    const [empleado, setEmpleado] = useState(null);
    const [colores, setColores] = useState([]);
    const [puntuaciones, setPuntuaciones] = useState(null);


    const [formateado, setFormateado] = useState([]);
    const [cargando, setCargando] = useState(false)
    const [cargando2,setCargando2 ] = useState(false);

    const [error, setError] = useState('');
    useEffect(()=>{
        axios.get(`http://localhost:9000/api/empleados/${id}`)
            .then( response => {
                console.log(response)
                setEmpleado(response.data);
             
            })
            .catch( error => {
                setError(error.message);     
            });
        axios.get(`http://localhost:9000/api/objetivoasignacion/${id}`)
            .then(response => {
                console.log(response)
                setObjetivos(response.data);
                setCargando(true)
            })
            .catch( error => {
                setError(error.message);
            })
        axios.get(`http://localhost:9000/api/puntuacion/puntuacionBarra/${id}`)
            .then(response => {
                console.log(response)
                setPuntuaciones(response.data);
                setCargando2(true)
            })
            .catch( error => {
                setError(error.message);
            })

    },[id]);

    useEffect(()=>{
        if(cargando){
            const nuevosColores = objetivos.map(()=> generarColorAleatorio());
            setColores(nuevosColores);
        }
       
    },[objetivos]);
    useEffect(()=>{
        if(cargando2){
            const nuevasPuntuaciones = formateo(puntuaciones);
            setFormateado(nuevasPuntuaciones);
            console.log(formateado)
        }
       
    },[puntuaciones]);
    

    return(
       

        <div>
          
            {error && <p>Error : {error}</p>}
            {user && user.rol === 'admin' ? (<>
                <h1 className="titulo">Objetivos asignados de {empleado?.nombre}</h1>
                <hr className="linea"></hr>
                
            </>
            
            ) : (
                <>
                    <h2 className="titulo">Bienvenido, {empleado?.nombre}</h2>

                     <hr className="linea"></hr> 
                </>
            )}
           
            <ul className="lista">
            {objetivos && objetivos.length !== 0 && puntuaciones ?  (
                <>
                <h3 style={{marginLeft:"17px"}}>Barra de peso de los objetivos:</h3>
                <div className="contenedor-barra">
                   
                    <BarraPeso objetivos={objetivos} colores={colores} />
                </div>
                
                <h3 style={{marginLeft:"17px"}}>Desempeño:</h3>
                <div className="contenedor-barra">
                   
                    <BarraDesempeno  formateado={puntuaciones} colores={colores} />
                    
                </div>
                <DesempenoTotal objetivos={puntuaciones} />
                <ul className="lista">
                    {objetivos.map((objetivos,index)=>(
                        <li key={index}>
                            
                            <Objetivo objetivo={objetivos} empleado={id} />
                        </li>
                ))}
                </ul>
                </>
            ) : (<SinElementos />)}
            </ul>
            
        </div>
         

    );
}

export default Feed;