import React,{ useState} from "react";
import { usePageTitle } from "../components/nombrePag";
import '../styles/Login.css'
function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    usePageTitle('Login | Medicion de objetos')

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('Usuario: ', username);
        console.log('Contraseña: ', password);
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