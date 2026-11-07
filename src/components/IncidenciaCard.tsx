import "../styles/IncidenciaCard.css";
interface IncidenciaCardProps {
    titulo: string;
    completada: boolean; // true = resuelta, false = pendiente
}

function IncidenciaCard({ titulo, completada }: IncidenciaCardProps) {
    return (
        // RENDERIZADO CONDICIONAL: según "completada" cambia la clase CSS (color de fondo)
        // y también el icono y el texto
        <div className={`tarjeta-incidencia ${completada ? "resuelta" : "pendiente"}`}>
            <span>{completada ? "✅ Resuelta" : "⏳ Pendiente"}</span>
            <p>{titulo}</p>
        </div>
    );
}

export default IncidenciaCard;