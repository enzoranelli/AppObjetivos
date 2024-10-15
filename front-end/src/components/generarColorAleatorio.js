
export const generarColorAleatorio = () => {
    const r = Math.floor(Math.random() * 256); // Valor rojo aleatorio
    const g = Math.floor(Math.random() * 256); // Valor verde aleatorio
    const b = Math.floor(Math.random() * 256); // Valor azul aleatorio
  
    // Para hacer el color pastel, combinamos los valores RGB con blanco
    const pastelR = Math.floor((r + 255) / 2);
    const pastelG = Math.floor((g + 255) / 2);
    const pastelB = Math.floor((b + 255) / 2);
  
    return `rgb(${pastelR}, ${pastelG}, ${pastelB})`;
  };
