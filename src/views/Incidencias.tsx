import { useState } from "react";
import IncidenciaCard from "../components/IncidenciaCard";

// Forma de los datos que devuelve la API (solo los campos que usamos)
interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

// VISTA INCIDENCIAS: tareas e incidencias de los departamentos (API JSONPlaceholder Todos)
function Incidencias() {
    const [incidencias, setIncidencias] = useState<Todo[]>([]); // datos de la API
    const [cargando, setCargando] = useState<boolean>(false);   // true mientras se espera la respuesta

    // Se ejecuta al pulsar el botón "Cargar datos": petición GET (solo 8 incidencias)
    const cargarDatos = async () => {
        setCargando(true);
        try {
            const respuesta = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=8");
            // fetch no falla con un 404 o 500: hay que comprobar "ok" a mano
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
                    {/* Una tarjeta por incidencia; "completed" decide su aspecto */}
                    {incidencias.map((t) => (
                        <IncidenciaCard key={t.id} titulo={t.title} completada={t.completed} />
                    ))}
                </div>
            )}
        </>
    );
}

export default Incidencias;