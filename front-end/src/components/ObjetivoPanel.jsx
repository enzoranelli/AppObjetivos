import React from "react";
//import "../old_styles/Objetivo.css"
import { useNavigate } from "react-router-dom";

function ObjetivoPanel(props){
    const nav = useNavigate();
    const handleClick = (tipo)=>{
       if(tipo === 'asignacion'){
        nav(`/asignar-objetivo/${props.objetivo.idObjetivo}`);
       }
       if(tipo === 'actualizar'){
        nav(`/actualizar-objetivo/${props.objetivo.idObjetivo}`);
       }
        
    }
    return (

        <div className="contenedor-objetivo bg-orange-100 rounded-xl border-1 border-custom-dark-orange p-2.5 m-2.5 animate-fade-in-up animation-delay-400 dark:bg-gray-900">
            <div className="flex items-center pb-2">
                <h2 className="w-[40%] text-2xl font-black">{props.objetivo.titulo}</h2>
                <p className="w-[33%]">Fecha de inicio: {props.objetivo.fechaInicio}</p>
                <p className="w-[33%]">Fecha final: {props.objetivo.fechaFinal}</p>
                <div className="w-[40%] flex gap-5 items-center">
                    <button className='orange-button w-[50%] mt-0' onClick={()=>handleClick('asignacion')}>Asignar personas</button>
                    <button className='orange-button w-[50%] mt-0' onClick={()=>handleClick('actualizar')}>Modificar Objetivo</button>
                </div>
                
            </div>
            <div className="border border-orange-400 w-full mb-2.5"></div>
 
            <p>Descripcion: {props.objetivo.descripcion}</p>
                       
            <div className="flex items-center gap-2 w-fullx">
                <p >Peso: </p>
                <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-custom-orange transition-all duration-300 dark:bg-custom-dark-orange"
                    style={{ width: `${props.objetivo.peso}%` }}
                    ></div>
                </div>
                <span className="min-w-[40px] text-right">{props.objetivo.peso}%</span>
            </div>
          
            
        </div>
    );
}
export default ObjetivoPanel;