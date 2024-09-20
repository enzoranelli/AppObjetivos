import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
import { obtenerEmpleados } from "../data/MockData";
function Empleados(){
    const colums = [{
        name: "Nombre",
        selector: row => row.Nombre
    },

    {
        name: "Area",
        selector: row => row.Area
    },
    {
        name: "",
        cell:(row)=>(
            <Link to={`/feed/${row.idEmpleado}`}>Ver objetivos</Link>
        ),
    },
    {
        name:"",
        cell:(row)=>(
            <Link to={`/actualizar-usuario/${row.idEmpleado}`}>Administrar cuenta</Link>
        ),
    }]

    const data = obtenerEmpleados();

    return (

        <div>
            <h1>Lista de Empleados</h1>
            <DataTable
            columns={colums}
            data={data}
            />
        </div>
    );
}

export default Empleados;