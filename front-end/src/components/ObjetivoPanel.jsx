import React from "react";
import "../styles/Objetivo.css"

function ObjetivoPanel(props){
   
    return (

        <div className="contenedor-objetivo">
            <h2>{props.objetivo.titulo}</h2>
            <p>Descripcion: {props.objetivo.descripcion}</p>
            <p>Fecha: {props.objetivo.fecha}</p>
            <p>Promedio de puntuacion: </p>
            <progress id="progreso "value={props.objetivo.valor} max="100"></progress>
            <label htmlFor="progreso">{props.objetivo.valor}%</label>
            <h2>Personas Asignadas</h2>
            <ul>
                <li><a>Juan Perez</a></li>
                <li><a>John Doe</a></li>
            </ul>
        </div>
    );

}

export default ObjetivoPanel;