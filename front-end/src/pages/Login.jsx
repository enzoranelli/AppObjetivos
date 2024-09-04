import React,{ useState} from "react";
import { usePageTitle } from "../components/nombrePag";

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
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <div class="input-group">
                    <label  htmlFor="username">Usuario:</label>
                    <input 
                        type="text" 
                        id="username"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)} 
                        required
                    />
                </div>
                <div class="input-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );

}
export default Login;