import React from "react";
import "../styles/Objetivo.css"
import { Navigate, useNavigate } from "react-router-dom";

function ObjetivoPanel(props){
    const nav = useNavigate();
 
    const handleClick = ()=>{
        console.log('Hciste click')
        
        nav(`/asignar-objetivo/${props.objetivo.idObjetivo}`);
    }

    return (

        <div className="contenedor-objetivo">
            <h2>{props.objetivo.titulo}</h2>
            <p>Descripcion: {props.objetivo.descripcion}</p>
            <p>Fecha de inicio: {props.objetivo.fechaInicio}</p>
            <p>Fecha final: {props.objetivo.fechaFinal}</p>
            
            <div className="contenedor-progreso">
                <p>Peso: </p>
                <progress id="progreso "value={props.objetivo.peso} max="100"></progress>
                <label htmlFor="progreso">{props.objetivo.peso}%</label>
            </div>
            
            <br></br>
            
            <button onClick={handleClick}>Asignar personas</button>
            
            
        </div>
    );

}

export default ObjetivoPanel;