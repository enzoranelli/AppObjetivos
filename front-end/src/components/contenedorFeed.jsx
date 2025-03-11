import { useParams } from "react-router-dom";
import Feed from "../pages/Feed";
import FeedCertificaciones from "../pages/FeedCertificaciones";
function ContenedorFeed(){
    const {tipo, id} = useParams();
    	
    return(
        <>
            {
                tipo === 'objetivos' ? <Feed id={id} /> : <FeedCertificaciones id={id} />
            }
        </>
    );
}
export default ContenedorFeed;