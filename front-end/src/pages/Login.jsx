import React,{ useState} from "react";
import { usePageTitle } from "../components/nombrePag";
import '../styles/Login.css'
import { useUserContext, useUserToggleContext } from "../UserProvider";
import { Navigate } from "react-router-dom";
function Login(){
    const user = useUserContext();
    const cambiaLogin = useUserToggleContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    usePageTitle('Login | Medicion de objetos')

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('Usuario: ', username);
        console.log('Contraseña: ', password);
        cambiaLogin();
    }
    if(user){
        var ruta = '';
        if(user.rol==='admin'){
            ruta= '/panel';
        }else{
            ruta = '/feed';
        }
        console.log(ruta);
        return <Navigate to={ruta}/>
    }

    return(
        <div className="login-container">
            <img className="logo" src="https://americagroupit.com/wp-content/uploads/2024/06/cropped-Logo_AG_Color_VF2024-01.png"
                alt="Logo AG"/>
            <form className="form-login" onSubmit={handleSubmit}>
                
                <h2 className="titulo-login">Iniciar sesión</h2>
                    <label  htmlFor="username">Usuario:</label>
                    <input 
                        type="text" 
                        id="username"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)} 
                        required
                    />
                    <label htmlFor="password">Contraseña:</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                
                <button type="submit">Entrar</button>
            </form>
        </div>
    );

}
export default Login;