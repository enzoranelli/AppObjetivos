import { useNavigate } from "react-router-dom";
function Certificacion({certificacion}){
    const nav = useNavigate();
        const handleClick = (tipo)=>{
           if(tipo === 'asignacion'){
            nav(`/asignar-certificacion/${certificacion.idCertificacion}`);
           }
           if(tipo === 'actualizar'){
            nav(`/actualizar-certificacion/${certificacion.idCertificacion}`);
           }
            
        }
    return(
        <div className="bg-orange-100 rounded-xl border-1 border-custom-dark-orange p-2.5 m-2.5 animate-fade-in-up animation-delay-400 dark:bg-gray-900">
            <div className="flex items-center pb-2">
                <h2 className="w-[40%] text-2xl font-black">{certificacion.nombreCertificacion}</h2>
                <p className="w-[33%]">Marca: {certificacion.marca}</p>
                <p className="w-[33%]">Año: {certificacion.anio}</p>
                <div className="w-[40%] flex gap-5 items-center">
                    <button className='orange-button w-[50%] mt-0'  onClick={()=>handleClick('asignacion')} >Asignar personas</button>
                    <button className='orange-button w-[50%] mt-0' onClick={()=>handleClick('actualizar')}>Modificar certificacion</button>
                </div>
            </div>
            <div className="border border-orange-400 w-full mb-2.5"></div>
 
            <p>Link del examen:  
                <a 
                    href={certificacion.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-custom-orange hover:text-custom-dark-orange dark:text-custom-dark-orange dark:hover:text-custom-orange underline transition-colors duration-300 font-medium"
                >
                    {' '+certificacion.url}
                </a>
            </p>
        </div>
    );
}

export default Certificacion;