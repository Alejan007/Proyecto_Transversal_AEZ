import "../styles/EmployeeCard.css";
interface EmployeeCardProps {
    nombre: string;
    email: string;
    ciudad: string;
}

// Nota: solo pinta los datos que le llegan por props.
function EmployeeCard({ nombre, email, ciudad }: EmployeeCardProps) {
    return (
        <div className="tarjeta-empleado">
            <h3>{nombre}</h3>
            <p>Email: {email}</p>
            <p>Ciudad: {ciudad}</p>
        </div>
    );
}

export default EmployeeCard;