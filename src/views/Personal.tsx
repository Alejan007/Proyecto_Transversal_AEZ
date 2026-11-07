import { useState } from "react";
import EmployeeCard from "../components/EmployeeCard";
import "../styles/Personal.css";

// Forma de los datos que devuelve la API (solo los campos que usamos)
interface Employee {
    id: number;
    name: string;
    email: string;
    address: { city: string };
}

function Personal() {
    // Estado "empleados": guarda los datos de la API. Empieza como array vacío [].
    const [empleados, setEmpleados] = useState<Employee[]>([]);
    // Estado "cargando": true mientras esperamos la respuesta del servidor.
    const [cargando, setCargando] = useState<boolean>(false);
    // Estado "busqueda": guarda el texto que escribe el usuario en el buscador
    const [busqueda, setBusqueda] = useState<string>("");

    // Función que se ejecuta al pulsar el botón: hace la petición GET.
    // "async" permite usar "await" dentro de la función.
    const cargarDatos = async () => {
        setCargando(true); // aparece el mensaje "Cargando..."
        try {
            // await = espera a que el servidor responda, sin bloquear la app
            const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
            const datos = await respuesta.json(); // convierte la respuesta a objetos
            setEmpleados(datos);                  // guarda los datos en el estado
        } catch (error) {
            // Si algo falla (sin internet, etc.) se muestra por consola
            console.error("Error al cargar los empleados:", error);
        }
        setCargando(false); // desaparece el mensaje "Cargando..."
    };

    // Filtro en tiempo real: nos quedamos solo con los empleados cuyo nombre
    // contiene lo escrito. Pasamos todo a minúsculas para no distinguir mayúsculas.
    const empleadosFiltrados = empleados.filter((emp) =>
        emp.name.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <>
            <button className="boton-cargar" onClick={cargarDatos}>
                Cargar datos
            </button>

            {/* Buscador: "value" y "onChange" enlazan el input con el estado "busqueda" */}
            <input
                type="text"
                className="buscador"
                placeholder="Buscar empleado por nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            {/* Mientras carga mostramos el mensaje; cuando termina, las tarjetas */}
            {cargando ? (
                <p className="mensaje">Cargando datos del servidor…</p>
            ) : (
                <div className="grid">
                    {/* Una tarjeta por empleado filtrado, pasándole los datos por props.
                        "key" es un identificador único que React necesita en las listas */}
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