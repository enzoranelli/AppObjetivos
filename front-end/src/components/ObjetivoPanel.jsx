import React from "react";
import "../styles/Objetivo.css"
import { Link, Outlet } from "react-router-dom";

function ObjetivoPanel(props){
   
    return (

        <div className="contenedor-objetivo">
            <h2>{props.objetivo.titulo}</h2>
            <p>Descripcion: {props.objetivo.descripcion}</p>
            <p>Fecha de inicio: {props.objetivo.fechaInicio}</p>
            <p>Fecha final: {props.objetivo.fechaFinal}</p>
            <p>Peso: </p>
            <progress id="progreso "value={props.objetivo.peso} max="100"></progress>
            <label htmlFor="progreso">{props.objetivo.peso}%</label>
          
            
            
            <button>Asignar personas.</button>
            {/**
             * Modificar: titulo, descripcion, fecha, y personas asignadas
             * 
             */}
            <Outlet />
        </div>
    );

}

export default ObjetivoPanel;