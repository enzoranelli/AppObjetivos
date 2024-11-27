import React, {useState, useContext, useEffect} from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { getApiUrl } from "./config/configURL";
const userContext = React.createContext();
const userToggleContext = React.createContext();
const trimestreContext = React.createContext(); // Contexto para el trimestre
const trimestreToggleContext = React.createContext(); 

export function useUserContext(){
    return useContext(userContext);
}

export function useUserToggleContext(){
    return useContext(userToggleContext);
}
export function useTrimestreContext() {
    return useContext(trimestreContext); // Acceso al trimestre
}

export function useTrimestreToggleContext() {
    return useContext(trimestreToggleContext); // Acceso para modificar el trimestre
}

export function UserProvider(props){
    const apiUrl = getApiUrl();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [trimestre, setTrimestre] = useState(1); // Estado para el trimestre
    const login = async(email, usuarioPassword) =>{
        try{
            const response  = await axios.post(`${apiUrl}/api/login`,{
                email,
                usuarioPassword,
            });

            if(response.status === 200){
                const userData = response.data;
                setUser(userData);
                setError('');
                Cookies.set('user', JSON.stringify(userData), {expires: 7});
            }

        }catch(error){
            if(error.response){
                setError(error.response.data.message || 'Credenciales incorrectas');
            } else{
                setError('Error en la conexión con el servidor.');
            }
            setUser(null);
            Cookies.remove('user');
        }
    }
    const logout = () => {
        setUser(null);  // Al cerrar sesión, simplemente se pone el usuario a null
        setError('');
        Cookies.remove('user');
    };
    const incrementarTrimestre = () => {
        setTrimestre((prev) => prev + 1); // Incrementar el trimestre
    };
    useEffect(()=>{
        const savedUser = Cookies.get('user');
        if(savedUser){
            setUser(JSON.parse(savedUser));
        }
    },[]);

    return(
        <userContext.Provider value={{user,error}}>
            <userToggleContext.Provider value={{login, logout}}>
                <trimestreContext.Provider value={trimestre}>
                    <trimestreToggleContext.Provider value={{incrementarTrimestre}}>
                        {props.children}
                    </trimestreToggleContext.Provider>
                </trimestreContext.Provider>
            </userToggleContext.Provider>
        </userContext.Provider>
    )

}