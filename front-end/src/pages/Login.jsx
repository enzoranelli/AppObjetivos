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
            
            <form className="form-login" onSubmit={handleSubmit}>
                <h2>Iniciar sesión</h2>
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