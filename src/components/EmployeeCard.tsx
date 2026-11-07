import "../styles/EmployeeCard.css";
// Props que recibe la tarjeta desde la vista Personal
interface EmployeeCardProps {
    nombre: string;
    email: string;
    ciudad: string;
}

// TARJETA DE EMPLEADO: solo pinta los datos que le llegan por props.
// No tiene estado ni lógica propia.
function EmployeeCard({ nombre, email, ciudad }: EmployeeCardProps) {
    return (
        <div className="tarjeta">
            <h3>{nombre}</h3>
            <p>Email: {email}</p>
            <p>Ciudad: {ciudad}</p>
        </div>
    );
}

export default EmployeeCard;