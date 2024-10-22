import React, {useState, useContext} from "react";
import axios from 'axios';
const userContext = React.createContext();
const userToggleContext = React.createContext();


export function useUserContext(){
    return useContext(userContext);
}

export function useUserToggleContext(){
    return useContext(userToggleContext);
}

export function UserProvider(props){
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    const login = async(email, usuarioPassword) =>{
        try{
            const response  = await axios.post('http://localhost:9000/api/login',{
                email,
                usuarioPassword,
            });

            if(response.status === 200){
                setUser(response.data);
                setError('');
            }

        }catch(error){
            if(error.response){
                setError(error.response.data.message || 'Credenciales incorrectas');
            } else{
                setError('Error en la conexión con el servidor.');
            }
            setUser(null);
        }
    }
    const logout = () => {
        setUser(null);  // Al cerrar sesión, simplemente se pone el usuario a null
        setError('');
    };

    

    return(
        <userContext.Provider value={{user,error}}>
            <userToggleContext.Provider value={{login, logout}}>
                {props.children}
            </userToggleContext.Provider>
        </userContext.Provider>
    )

}