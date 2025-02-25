import { useState, useEffect} from "react";
import "../styles/ObjetivoNuevos.css";
import { Navigate } from "react-router-dom";
import { getApiUrl } from "../config/configURL";
import axios from "axios";
function NuevaCertificacion(){
    const [marcas, setMarcas] = useState([]);
    
    useEffect(()=>{
        axios.get(`${getApiUrl()}/api/certificacion/marcas`)
            .then(response => {
                setMarcas(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },[]);
    
    return(
        <div className="objetivo-container">
            <form className="form-objetivo" >
                <h1  className="titulo-puntuacion">Agregar objetivo</h1>
                <div className="contenedor-input">
                    <label className="label-form">Título:</label>
                    <input type="text" className="input-objetivo-nuevo" ></input>
                </div>
                <div className="contenedor-input">
                    <label htmlFor="fechaFinal"> Marca: </label>
                    <select name="marca">
                        {
                            marcas.map((marca, index) => {
                                return (
                                    <option key={index} value={marca.nombreMarca}>{marca.nombreMarca}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className="boton-agregar" type="submit">Agregar</button>
            </form>
            
        </div>
    )
}

export default NuevaCertificacion;