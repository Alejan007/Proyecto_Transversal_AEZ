import { useState } from "react";
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

    const cargarDatos = async () => {
        setCargando(true);
        try {
            const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!respuesta.ok) {
                throw new Error(`Error en el servidor: ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            setEmpleados(datos);
        } catch (error) {
            console.error("Error al cargar los empleados:", error);
        }
        setCargando(false);
    };

    const empleadosFiltrados = empleados.filter((emp) =>
        emp.name.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <>
            <button className="boton-cargar" onClick={cargarDatos}>
                Cargar datos
            </button>

            <input type="text" className="buscador" placeholder="Buscar empleado por nombre..." value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            {cargando ? (<p className="mensaje">Cargando datos del servidor…</p>) : (
                <div className="grid">
                    {empleadosFiltrados.map((emp) => (
                        <EmployeeCard
                            key={emp.id}
                            nombre={emp.name}
                            email={emp.email}
                            ciudad={emp.address.city} />))}
                </div>
            )}
        </>
    );
}

export default Personal;