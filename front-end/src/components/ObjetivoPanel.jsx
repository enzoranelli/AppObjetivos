import React from "react";
import "../styles/Objetivo.css"
import { Link, Outlet } from "react-router-dom";

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
                <li><Link to='/objetivo-empleado/1'>Enzo Ranelli</Link></li>
                <li>Juan Perez</li>
            </ul>
            
            <button>Modificar</button>
            {/**
             * Modificar: titulo, descripcion, fecha, y personas asignadas
             * 
             */}
            <Outlet />
        </div>
    );

}

export default ObjetivoPanel;