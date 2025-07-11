import React,{ useState} from "react";
import { usePageTitle } from "../utils/nombrePag";
import { useUserContext, useUserToggleContext } from "../context/UserProvider";
import { Navigate } from "react-router-dom";
import logo from '../assets/images/logo.png'
function Login(){
    const {user, error} = useUserContext();
    const {login, logout} = useUserToggleContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    usePageTitle('Login | Medicion de objetivos')

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log('Usuario: ', username);
        console.log('Contraseña: ', password);
        
        await  login(username, password);
    }
    if(user){
        var ruta = '';
        if(user.activo === 1){
        if(user.rol==='admin'){
            ruta= '/panel';
        }else{
            ruta = `/feed/${user.empleado}`;
        }}else{
            ruta = `/cuenta-deshabilitada`;
        }
        console.log(ruta);
        console.log('Estado de la cuenta', user.activo)
        return <Navigate to={ruta}/>
    }

    return(
        <div className="flex flex-col items-center h-screen bg-white gap-10 JosefinSans">
            <img className="w-xl animate-fade-in-up animation-delay-400" src={logo} alt="Logo de objetivos"/>
            <form 
                className="flex w-100 flex-col text-xl p-5 border-2 border-custom-orange rounded-2xl shadow-2xl animate-fade-in-up animation-delay-400"
                onSubmit={handleSubmit}>
                <h1 className="text-center">Iniciar sesión</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <label  htmlFor="username">Usuario:</label>
                <input 
                    className="input-custom"
                    type="text" 
                    id="username"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)} 
                    required
                />
                <label htmlFor="password">Contraseña:</label>
                <input 
                    className="input-custom"
                    type="password" 
                    id="password" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                />
                
                <button 
                    className="orange-button"
                    type="submit"
                >
                    Entrar
                </button>
            </form>
        </div>
    );

}
export default Login;