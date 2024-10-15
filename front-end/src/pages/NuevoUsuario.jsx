import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {useForm} from 'react-hook-form';
import '../styles/FormUsuario.css';

function NuevoUsuario(){
    const {register, handleSubmit} = useForm();
    const [redirect, setRedirect] = useState(false);

    const onSubmit = async (data) =>{
    
        const verificar = verificarFormulario(data);
    
        console.log(verificar)
        if(verificar){
        
         
            console.log(data)
            try {
                const response = await fetch('http://localhost:9000/api/empleados',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
    
                if(!response.ok){
                    throw new Error('Error en la soclicitud');
                }

                if(response.ok){
                    setRedirect(true);
                }
    
            } catch (error) {
                console.log('Error al enviar datos', error);
            }

        }else{
            alert('Campos incompletos');
        }   
    
    }

    function verificarFormulario(data){
        console.log(data)
        for(const propiedad in data){
            if(data.hasOwnProperty(propiedad)){
                const valor = data[propiedad];
                if(valor === '' || valor === ""){
                    console.log('Esto dio falso')
                    return false;
                }
            }
        }
        data.rol = data.rol=== 'admin'
        console.log(data.usuarioPassword);
        console.log(data.confirmar);
        return data.usuarioPassword === data.confirmar ? true : false;
        
    }

    if (redirect) {
        return <Navigate to='/redireccion/usuario' />;
    }
    return (
      <div className="form-container">
            <form className="form-agregar" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="titulo">Agregar nuevo usuario</h1>
                <div className="contenedor-input">
                    <label className="label-form">Nombre</label>
                    <input type="text" className="input-text" {...register('nombre')}></input>
                </div>

                <div className="contenedor-input">
                    <label>Apellido</label>
                    <input type="text" className="input-text" {...register('apellido')}></input>
                </div>

                <div className="contenedor-input">
                    <label>Puesto</label>
                    <input type="text" className="input-text" {...register('puesto')}></input>
                </div>

                <div className="contenedor-input">
                    <label>Area</label>
                    <input type="text" className="input-text" {...register('area')}></input>
                </div>
                
                <div className="contenedor-input">
                    <label>Correo electronico<b>**</b></label>
                    <input type="email" className="input-text" {...register('email',{autoComplete:"off"})}></input>
                </div>

                <div className="contenedor-input">
                    <label>Contraseña</label>
                    <input type="password" className="input-text" {...register('usuarioPassword',{autoComplete:"off"})}></input>
                </div>

                <div className="contenedor-input">
                    <label>Confirmar contraseña</label>
                    <input type="password" className="input-text" {...register('confirmar')}></input>
                </div>

                <div className="contenedor-input">
                    <label><b>¿Es administrador?</b></label>
                    <div className="contenedor-radio">
                        <label className="label-radio">
                            <input
                                className="input-radio"
                                type="radio"
                                value="admin"
                                {...register('rol')}
                            />
                            Sí
                        </label>

                        <label className="label-radio">
                            <input
                                className="input-radio"
                                type="radio"
                                value="user"
                                {...register('rol')}
                            />
                            No
                        </label>
                    </div>
                </div>
                <div className="contenedor-input">
                    <p className="aviso">{'(**) Los campos marcados tienen que ser unicos para cada empleado.'}</p>
                    <button type="submit" value="Agregar" className="boton-submit">Agregar usuario</button>
                </div>
                
            </form>
      </div>
    );
}
export default NuevoUsuario;