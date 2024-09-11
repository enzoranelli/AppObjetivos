import { usePageTitle } from "../components/nombrePag";
import { useState } from "react";
function Home(){
    usePageTitle('Home | Medicion de objetos')
    const [texto, setTexto] = useState("");
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
    const [puntuacion, setPuntuacion] = useState(0);
    // Función para manejar el envío del formulario
    const manejarEnvio = (e) => {
        e.preventDefault();
        // Aquí puedes procesar los valores del formulario
        console.log("Texto:", texto);
        console.log("Opción seleccionada:", opcionSeleccionada);
    };

    return (
        <div className="objetivo-container">
        <h1>Agregar objetivo</h1>
        <form onSubmit={manejarEnvio}>
        <div>
            <label htmlFor="texto">Descripcion del objetivo</label>
            <textarea
            type="text"
            id="texto"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            rows="7"
            cols="50"
            />
        </div>

        <div>
            <h3>Asigne el objetivo a un area </h3>
            <label htmlFor="opcion">Selecciona una opción:</label>
            <select
            id="opcion"
            value={opcionSeleccionada}
            onChange={(e) => setOpcionSeleccionada(e.target.value)}
            >
            <option value="">--Selecciona una opción--</option>
            <option value="opcion1">Marketing</option>
            <option value="opcion2">Operaciones</option>
            <option value="opcion3">Contabilidad</option>
            </select>
        </div>
        <div>
            <label htmlFor="slider">Asigne porcentaje de puntuación </label>
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
        <button type="submit">Enviar</button>
        </form>
        </div>
        
    );

}
export default Home;