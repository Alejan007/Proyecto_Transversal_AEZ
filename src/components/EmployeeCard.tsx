import "../styles/EmployeeCard.css";
interface EmployeeCardProps {
    nombre: string;
    email: string;
    ciudad: string;
}

function EmployeeCard({ nombre, email, ciudad }: EmployeeCardProps) {
    return (
        <div className="employee-card">
            <h3>{nombre}</h3>
            <p> Email {email}</p>
            <p>Ciudad: {ciudad}</p>
        </div>
    );
}

export default EmployeeCard;