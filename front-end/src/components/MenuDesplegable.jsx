import BotonTema from "./BotonTema";

function MenuDesplegable(){

    return (
        <div className="bg-white text-black dark:bg-dark-bg dark:text-white shadow-lg rounded-lg p-4 mt-2 animate-fade-in-up animation-delay-400">
            
            <ul className="space-y-2">
                <li>
                    <button className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200 text-gray-900 dark:text-gray-100">
                        Cerrar Sesión
                    </button>
                </li>
                <li>
                    <button className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200 text-gray-900 dark:text-gray-100">
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

export default MenuDesplegable;