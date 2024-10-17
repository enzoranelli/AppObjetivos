import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
import SinElementos from "../components/SinElementos";
import axios from 'axios';
import { useState, useEffect } from 'react';
function Empleados(){
    const [empleados, setEmpleados] = useState(null);
    const [error, setError]  =useState(null);
    const [cargando, setCargando] = useState(true);
    const colums = [{
        name: "Nombre",
        selector: row => row.nombre,
        sortable: true,
    },

    {
        name: "Area",
        selector: row => row.area
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

    useEffect(()=>{
        axios.get('http://localhost:9000/api/empleados')
            .then( response => {
                console.log(response)
                setEmpleados(response.data);
                setCargando(false);
            })
            .catch( error => {
                setError(error.message);
                setCargando(false);
            });
        
    },[]);

    if(cargando) return <p>Cargando...</p>
    if(error) return <p>Error: {error}</p>

    return (

        <div>
            <h1 className="titulo">Lista de Empleados</h1>
            <hr className="linea"></hr>
            <DataTable
                columns={colums}
                data={empleados}
                pagination
                highlightOnHover
                striped
                noDataComponent={<SinElementos elemento='empleados'/>}
            />
            
        
        </div>
    );
}

export default Empleados;