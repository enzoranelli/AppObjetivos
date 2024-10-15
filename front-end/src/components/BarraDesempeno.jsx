import { useState, useEffect} from "react";

function BarraDesempeno({ formateado, colores }) {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    // Calcular el total cuando 'formateado' cambie
    const nuevoTotal = formateado.reduce((acumulador, item) => {
      return acumulador + item.despeno;
    }, 0);
    
    setTotal(nuevoTotal);
  }, [formateado]); 
  return (
      <div style={{ display: 'flex', height: '30px', width: '98%', border: '1px solid #000', borderRadius: '0 10px 10px 0' }}>
        {formateado.map((item, index) => {
          const porcentajePeso = item.peso;
         
          const porcentajeTotal = item.despeno; // Calcular el porcentaje total considerando el peso
          const color = colores[index]; // Usar el color correspondiente
          
          
          return (
            <div
              key={index}
              style={{
                width: `${porcentajeTotal}%`,
                backgroundColor: color,
                textAlign: 'center',
                display: 'flex',
                border: `5px solid ${color}`,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '0 10px 10px 0',
                marginLeft: index === 0 ? '0' : '-5px',
                position: 'relative',
                zIndex: formateado.length - index,
              }}
            >
              {item.titulo} ({porcentajeTotal}%)
            </div>
          );
        })}
      </div>
    );
  }
  
  export default BarraDesempeno;