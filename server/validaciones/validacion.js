

 // Función de validación
export const validarCamposPrestamo = (campos) => {
    // Verificar si todos los campos necesarios están presentes y son válidos
    if (!campos.id_cliente || !campos.cantidad_prestada || !campos.total_deuda || !campos.interes) {
        throw new Error('Todos los campos son obligatorios.');
    }

    // Puedes agregar más validaciones según tus necesidades

    return true;
};