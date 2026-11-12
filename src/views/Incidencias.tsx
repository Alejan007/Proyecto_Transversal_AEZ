import { useState } from "react";
import IncidenciaCard from "../components/IncidenciaCard";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}


function Incidencias() {
    const [incidencias, setIncidencias] = useState<Todo[]>([]);
    const [cargando, setCargando] = useState<boolean>(false);

    const cargarDatos = async () => {
        setCargando(true);
        try {
            const respuesta = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=8");
            if (!respuesta.ok) {
                throw new Error(`Error en el servidor: ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            setIncidencias(datos);
        } catch (error) {
            console.error("Error al cargar las incidencias:", error);
        }
        setCargando(false);
    };

    return (
        <>
            <button className="boton-cargar" onClick={cargarDatos}>
                Cargar datos
            </button>

            {cargando ? (
                <p className="mensaje">Cargando datos del servidor…</p>
            ) : (
                <div className="grid">
                    {incidencias.map((t) => (
                        <IncidenciaCard key={t.id} titulo={t.title} completada={t.completed} />
                    ))}
                </div>
            )}
        </>
    );
}

export default Incidencias;