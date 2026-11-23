import { useState, useEffect } from "react";
import EmployeeCard from "../components/EmployeeCard";
import "../styles/Personal.css";

interface Employee {
    id: number;
    name: string;
    email: string;
    address: { city: string };
}

function Personal() {
    const [empleados, setEmpleados] = useState<Employee[]>([]);
    const [cargando, setCargando] = useState<boolean>(false);
    const [busqueda, setBusqueda] = useState<string>("");

    const cargarDatos = async (signal?: AbortSignal) => {
        setCargando(true);
        try {
            const respuesta = await fetch("https://jsonplaceholder.typicode.com/users", { signal });
            if (!respuesta.ok) {
                throw new Error(`Error en el servidor: ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            setEmpleados(datos);
        } catch (error: unknown) {
            if (error instanceof Error && error.name !== "AbortError") {
                console.error("Error al cargar los empleados:", error.message);
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

    const empleadosFiltrados = empleados.filter((emp) =>
        emp.name.toLowerCase().includes(busqueda.toLowerCase()));

    return (
        <>
            <button className="boton-cargar" onClick={() => cargarDatos()}>
                Recargar datos
            </button>

            <input
                type="text"
                className="buscador"
                placeholder="Buscar empleado por nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            {cargando ? (
                <p className="mensaje">Cargando datos del servidor…</p>
            ) : (
                <div className="grid">
                    {empleadosFiltrados.map((emp) => (
                        <EmployeeCard
                            key={emp.id}
                            nombre={emp.name}
                            email={emp.email}
                            ciudad={emp.address.city}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default Personal;