import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
function Usuarios(){
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
            <Link to="/feed">Ver objetivos</Link>
        ),
    },
    {
        name:"",
        cell:(row)=>(
            <p>Administrar cuenta</p>
        ),
    }]

    const data = [
        {
            Nombre:"Enzo Ranelli",
            Area:"Banco BICE",

        },
        {
            Nombre:"Juan Perez",
            Area:"Soporte Tecnico",

        }
    ]

    return (

        <div>
            <h1>Lista de usuarios</h1>
            <DataTable
            columns={colums}
            data={data}
            />
        </div>
    );
}

export default Usuarios;