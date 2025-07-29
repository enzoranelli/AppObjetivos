import { useState, useEffect, useRef } from "react";
import BotonTema from "./BotonTema";
import { useUserContext, useUserToggleContext } from "../context/UserProvider.jsx";
function MenuDesplegable(){
    const [abierto, setAbierto] = useState(false);
    const menuRef = useRef(null);
    const {user} = useUserContext();
    const {logout} = useUserToggleContext();
    
    useEffect(() => {
        function manejarClickAfuera(event) {
            // Si se hace clic fuera del menú, se cierra
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setAbierto(false);
            }
        }

            // Escuchamos los clics en el documento
        document.addEventListener('mousedown', manejarClickAfuera);

            // Limpieza al desmontar el componente
        return () => {
            document.removeEventListener('mousedown', manejarClickAfuera);
            };
        }
        ,[]);
    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <button
                onClick={() => setAbierto((prev) => !prev)}
                className="nav-links py-0"
            >
                Configuración
            </button>
            {
                abierto && (
                    <div className="absolute -right-4 mt-2 w-48 bg-white text-black dark:bg-dark-bg dark:text-white shadow-lg rounded-lg p-4 animate-fade-in-up animation-delay-400">
            
                        <ul className="space-y-2 flex flex-col items-center">
                            <li>
                                <button 
                                onClick={logout} 
                                
                                className="w-full text-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200 text-gray-900 dark:text-gray-100">
                                    Cerrar Sesión
                                </button>
                            </li>
                            <li>
                                <button 
                                
                                className="w-full text-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200 text-gray-900 dark:text-gray-100">
                                    Configuración
                                </button>
                            </li>
                            <li className="p-2">
                                <BotonTema />
                            </li>
                        </ul>
                    </div>
                )
            }
            
        </div>
        
    )
}

export default MenuDesplegable;