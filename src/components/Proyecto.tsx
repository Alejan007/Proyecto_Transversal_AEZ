import { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import EmployeeCard from "./EmployeeCard";
import "../styles/Proyecto.css";

// Interface con la estructura de datos devuelta por JSONPlaceholder
interface Employee {
    id: number;
    name: string;
    email: string;
    address: {
        city: string;
    };
}

function Proyecto() {
    // Nombres de las secciones disponibles en la aplicación
    const pestañas = ["Personal", "Incidencias", "Inventario"];

    // Estado para controlar la pestaña activa
    const [seccion, setSeccion] = useState<string>("Personal");

    // Estados para la carga de datos de la API y el filtro
    const [empleados, setEmpleados] = useState<Employee[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);
    const [busqueda, setBusqueda] = useState<string>("");

    // Petición a la API al estar en la sección Personal
    useEffect(() => {
        if (seccion === "Personal") {
            setCargando(true);
            fetch("https://jsonplaceholder.typicode.com/users")
                .then((res) => res.json())
                .then((data: Employee[]) => {
                    setEmpleados(data);
                    setCargando(false);
                })
                .catch((error) => {
                    console.error("Error al cargar empleados:", error);
                    setCargando(false);
                });
        }
    }, [seccion]);

    // Filtrado de la lista en tiempo real según la búsqueda
    const empleadosFiltrados = empleados.filter((emp) =>
        emp.name.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="layout">
            {/* Franja superior de la cabecera vacía */}
            <div className="cabecera"></div>

            {/* Estructura principal */}
            <div className="cuerpo">

                {/* Menú lateral renderizado dinámicamente */}
                <div className="sidebar">
                    {/*key={item} es para identificar para saber qué elemento se ha hecho clic, 

                    titulo={item} Le envía al componente SidebarItem el texto que debe mostrar en el botón

                    activo={seccion === item}  Compara si la sección  seleccionada  coincide con el nombre del botón actual (item) 
                    devuelve true. Si es true, el componente añade la clase CSS .activo para cambiar el color de fondo y destacar visualmente la pestaña seleccionada.*/}
                    {pestañas.map((pestaña) => (
                        <SidebarItem
                            key={pestaña}
                            titulo={pestaña}
                            activo={seccion === pestaña}
                            onClick={() => {
                                setSeccion(pestaña);
                                setBusqueda("");
                            }}
                        />
                    ))}
                </div>

                {/* Panel contenedor de la zona derecha */}
                <div className="panel-principal">

                    {/* Input de búsqueda */}
                    <div className="busqueda">
                        {/*Para dar el color gris al buscador*/}

                        {/*value={busqueda} Vincula el valor del cuadro de texto con la variable de estado busqueda*/}

                        {/*onChange={(e) => setBusqueda(e.target.value)} Escucha cada pulsación de tecla para actualizar el estado en tiempo real*/}
                        <input
                            type="text"
                            className="input-busqueda"
                            placeholder={`Buscar en ${seccion}...`}
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>

                    {/* Área reservada para el renderizado condicional */}
                    <div className="contenido">
                        {/* Se alimentará con las llamadas a las APIs */}

                        {/*seccion === "Personal" Condicional lógico: comprueba si la pestaña seleccionada es Personal*/}
                        {seccion === "Personal" && (
                            /*cargando ? (...) : (...) Operador ternario: muestra la pantalla de carga mientras cargando sea true, y dibuja la rejilla de tarjetas al pasar a false*/
                            cargando ? (
                                <div className="cargando">Cargando datos del servidor...</div>
                            ) : (
                                <div className="grid-tarjetas">
                                    {/*empleadosFiltrados.map Recorre cada empleado de la lista filtrada y genera un componente EmployeeCard*/}
                                    {empleadosFiltrados.map((emp) => (
                                        /*EmployeeCard Componente hijo al que le enviamos nombre, email y ciudad a través de props*/
                                        <EmployeeCard
                                            key={emp.id}
                                            nombre={emp.name}
                                            email={emp.email}
                                            ciudad={emp.address.city}
                                        />
                                    ))}
                                </div>
                            )
                        )}

                        {/*Vistas secundarias para el resto de pestañas*/}
                        {seccion === "Incidencias" && <div>Vista de Incidencias</div>}
                        {seccion === "Inventario" && <div>Vista de Inventario</div>}
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Proyecto;