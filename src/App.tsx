import { useState } from "react";
import Header from "./components/Header";
import SidebarItem from "./components/SidebarItem";
import Personal from "./views/Personal";
import Inventario from "./views/Inventario";
import Incidencias from "./views/Incidencias";
import "./styles/App.css";

function App() {
  const pestañas = ["Personal", "Inventario", "Incidencias"];

  // Estado "seccion": guarda qué pestaña está seleccionada (empieza en Personal)
  const [seccion, setSeccion] = useState<string>("Personal");

  return (
    <div className="app">
      <Header />

      <div className="cuerpo">
        <nav className="sidebar">
          {/* .map() recorre el array y crea un botón por cada pestaña.
                        "key" es un identificador único que React necesita en las listas. */}
          {pestañas.map((pestaña) => (
            <SidebarItem
              key={pestaña}
              titulo={pestaña}
              activo={seccion === pestaña}        // true solo en la pestaña seleccionada
              onClick={() => setSeccion(pestaña)} // al pulsar, cambia la sección
            />
          ))}
        </nav>

        {/* RENDERIZADO CONDICIONAL: solo se pinta la vista que coincide con "seccion" */}
        <main id="panel_central">
          {seccion === "Personal" && <Personal />}
          {seccion === "Inventario" && <Inventario />}
          {seccion === "Incidencias" && <Incidencias />}
        </main>
      </div>
    </div>
  );
}

export default App; 