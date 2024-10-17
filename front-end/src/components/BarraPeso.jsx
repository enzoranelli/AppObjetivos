function BarraPeso({objetivos, colores}) {
    // Calcular el porcentaje acumulado y el espacio vacío
    const totalPeso = objetivos.reduce((acc, item) => acc + item.peso, 0);
    const espacioVacio = Math.max(0, 100 - totalPeso); // Calcular el espacio vacío si es necesario
  

    return (
      <div style={{ display: 'flex', height: '30px', width: '98%', border: '1px solid #000', borderRadius: '0 10px 10px 0'}}>
        {objetivos.map((item, index) => {
          const porcentaje = item.peso; // Utiliza el peso directamente
          const color =colores[index]; // Generar color aleatorio
  
          return (
            <div
              key={index}
              style={{
                width: `${porcentaje}%`,
                backgroundColor: color,
                textAlign: 'center',
                display: 'flex',
                border: `5px solid ${color}`,
                //boxShadow: `0px 1px 5px ${color}, 0px 1px 10px ${color}`,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius:'0 10px 10px 0',
                marginLeft: index === 0 ? '0' : '-5px', // Superponer ligeramente (ajusta el valor según lo desees)
                position: 'relative',
                zIndex: objetivos.length - index, // Asegura que el elemento esté por encima de otros
              }}
            >
              {item.titulo} ({porcentaje}%)
            </div>
          );
        })}
  
        {/* Representar el espacio vacío */}
        {espacioVacio > 0 && (
          <div
            style={{
              flexGrow: 1, // Permitir que ocupe el espacio restante
              backgroundColor: '#e0e0e0', // Color del espacio vacío
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '0 10px 10px 0', // Esquinas redondeadas
              marginLeft: '-5px', // Superponer ligeramente
              position: 'relative',
              zIndex: 0, // Asegura que el espacio vacío esté por debajo de otros
            }}
          >
            Espacio vacío ({espacioVacio}%)
          </div>
        )}
      </div>
    );
  };
  
export default BarraPeso;