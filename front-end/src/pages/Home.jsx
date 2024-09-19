import { usePageTitle } from "../components/nombrePag";
import { useState } from "react";
import "../styles/ObjetivoNuevos.css";

function Home(){
    usePageTitle('Home | Medicion de objetos')

    const [texto, setTexto] = useState("");
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
    const [puntuacion, setPuntuacion] = useState(0);
    const [titulo, setTitulo] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFinal, setFechaFinal] = useState("");
    const [opcionEmpleado, setOpcionEmpleado] = useState("");

    const [deshabilitarOp1, setDeshabilitarOp1] = useState(false);
    const [deshabilitarOp2, setDeshabilitarOp2] = useState(false); 

    // Función para manejar el envío del formulario
    const manejarEnvio = (e) => {
        e.preventDefault();
        // Aquí puedes procesar los valores del formulario

        console.log("Titulo", titulo);
        console.log("Texto:", texto);
        console.log("Opción seleccionada:", opcionSeleccionada);
        console.log("Empleado:" , opcionEmpleado);
        console.log("Puntaje: ", puntuacion);
    };

    const handleOp1 = (e) => {
        const value = e.target.value;
        setOpcionSeleccionada(value);

        if( value !== ""){
            setDeshabilitarOp2(true);
        }else{
            setDeshabilitarOp2(false);
        }
    }

    const handleOp2 = (e) => {
        const value = e.target.value;
        setOpcionEmpleado(value);

        if( value !== ""){
            setDeshabilitarOp1(true);
        }else{
            setDeshabilitarOp1(false);
        }
    }

    return (
        <div className="objetivo-container">
        
            <form className="form-objetivo" onSubmit={manejarEnvio}>
                <h1>Agregar objetivo</h1>
                <div className="contenedor-input">
                    <label className="label-form">Título</label>
                    <input type="text" className="input-text" value={titulo} onChange={(e)=> setTitulo(e.target.value)}></input>
                </div>

                <div className="contenedor-input">
                    <label className="descripcion-label" htmlFor="texto">Descripcion del objetivo: (Máximo de caracteres: {texto.length}/{2500})</label>
                    <textarea
                        type="text"
                        id="texto"
                        className="text-area"
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        maxLength={2500}    
                    />
                </div>
        <div className="contenedor-input">
            <label htmlFor="fechaInicio"> Fecha de inicio: </label>
            <input
                type="date"
                id="fechaInicio"
                name="fechaInicio"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                required
            />
        </div>
        <div className="contenedor-input">
            <label htmlFor="fechaFinal"> Fecha de final: </label>
            <input
                type="date"
                id="fechaFinal"
                name="fechaFinal"
                value={fechaFinal}
                min={fechaInicio}
                onChange={(e) => setFechaFinal(e.target.value)}
                required
            />
        </div>
        <div className="contenedor-input">
            <h3>Asigne el objetivo a un area o a un empleado</h3>
            <label className="descripcion-label" htmlFor="opcion">Selecciona una seccion:</label>
            <select
            className="select-form"
            id="opcion"
            value={opcionSeleccionada}
            onChange={handleOp1}
            disabled={deshabilitarOp1}
            >
            <option value="">--Selecciona una seccion--</option>
            <option value="opcion1">Marketing</option>
            <option value="opcion2">Operaciones</option>
            <option value="opcion3">Contabilidad</option>
            </select>
        </div>
       
        <div className="contenedor-input" >
            <label htmlFor="opcion" className="descripcion-label">Selecciona un empleado:</label>
            <select
            className="select-form"
            id="opcion"
            value={opcionEmpleado}
            onChange={handleOp2}
            disabled={deshabilitarOp2}
            >
            <option value="">--Selecciona un empleado--</option>
            <option value="Enzo">Enzo</option>
            <option value="Juan">Juan</option>
            <option value="Jose">Jose</option>
            </select>
        </div>
        <div className="contenedor-input">
            <label htmlFor="slider" className="descripcion-label">Asigne porcentaje de puntuación: </label>
            <input 
                type="range"
                id="puntuacion"
                min="0"
                max="100"
                value={puntuacion}
                onChange={(e)=>setPuntuacion(e.target.value)}
            />
            <label>{puntuacion}%</label>
        </div>
        <button className="boton-agregar" type="submit">Agregar</button>
        </form>
        </div>
        
    );

}
export default Home;