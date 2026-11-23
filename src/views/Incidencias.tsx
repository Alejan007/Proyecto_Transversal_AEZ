import { useState, useEffect } from "react";
import IncidenciaCard from "../components/IncidenciaCard";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

function Incidencias() {
    const [incidencias, setIncidencias] = useState<Todo[]>([]);
    const [cargando, setCargando] = useState<boolean>(false);

    const cargarDatos = async (signal?: AbortSignal) => {
        setCargando(true);
        try {
            const respuesta = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=8", { signal });
            if (!respuesta.ok) {
                throw new Error(`Error en el servidor: ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            setIncidencias(datos);
        } catch (error: unknown) {
            if (error instanceof Error && error.name !== "AbortError") {
                console.error("Error al cargar las incidencias:", error.message);
            }
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        cargarDatos(controller.signal);

        return () => controller.abort();
    }, []);

    return (
        <>
            <button className="boton-cargar" onClick={() => cargarDatos()}>
                Recargar datos
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