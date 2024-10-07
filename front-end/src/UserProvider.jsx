import React, {useState, useContext} from "react";
import { obtenerUsario } from "./data/MockData";

const userContext = React.createContext();
const userToggleContext = React.createContext();
const redireccionar = React.createContext();

export function useUserContext(){
    return useContext(userContext);
}

export function useUserToggleContext(){
    return useContext(userToggleContext);
}
function getUsuario(){
    //Logica para la api 
    return obtenerUsario();
}
export function UserProvider(props){
    const [user, setUser] = useState(null);

    const cambiaLogin = () =>{
        if(user){
            setUser(null);
        }else {
            setUser(getUsuario());
        }
    }

    return(
        <userContext.Provider value={user}>
            <userToggleContext.Provider value={cambiaLogin}>
                {props.children}
            </userToggleContext.Provider>
        </userContext.Provider>
    )

}