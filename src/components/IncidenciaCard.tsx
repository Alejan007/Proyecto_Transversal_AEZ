import "../styles/IncidenciaCard.css";
interface IncidenciaCardProps {
    titulo: string;
    completada: boolean;
}

function IncidenciaCard({ titulo, completada }: IncidenciaCardProps) {
    return (
        <div className={`tarjeta-incidencia ${completada ? "resuelta" : "pendiente"}`}>
            <span>{completada ? "Resuelta" : "Pendiente"}</span>
            <p>{titulo}</p>
        </div>
    );
}

export default IncidenciaCard;