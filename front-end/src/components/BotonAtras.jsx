import { useNavigate } from "react-router-dom";
function BotonAtras(){
    const navigate = useNavigate();
    return(
        <button 
                type="button" 
                onClick={() => navigate(-1)}
                className="bg-custom-orange text-white rounded-xl absolute top-15 left-4 flex items-center gap-2 px-4 py-2 hover:bg-custom-dark-orange dark:bg-custom-dark-orange dark:text-gray-300 dark:hover:text-white transition-colors z-10"
                >
                 
                    <span className="symbols">{'('}</span>
                 
                    <span className="font-black"> Volver</span>
        </button>
    );
}

export default BotonAtras;