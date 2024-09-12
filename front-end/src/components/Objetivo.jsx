import React from "react";
import "../styles/Objetivo.css"

function Objetivo(props){
    /**
     *  const objetivo = {
        titulo: "Certificaciones",
        fecha: "12/09/2024",
        descripcion: "El proposito de este objetivo es plasmar si el usuario completo certificaciones.",
        valor: "50%"

    } 
     */
    return (

        <div className="contenedor-objetivo">
            <h2>{props.objetivo.titulo}</h2>
            <p>Descripcion: {props.objetivo.descripcion}</p>
            <p>Fecha: {props.objetivo.fecha}</p>
            <p>Su puntuacion: </p>
            <progress id="progreso "value={props.objetivo.valor} max="100"></progress>
            <label htmlFor="progreso">{props.objetivo.valor}%</label>
        </div>
    );

}

export default Objetivo;