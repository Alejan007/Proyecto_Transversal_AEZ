import { useState } from "react";
import Header from "./components/Header";
import SidebarItem from "./components/SidebarItem";
import Personal from "./views/Personal";
import Inventario from "./views/Inventario";
import Incidencias from "./views/Incidencias";
import "./styles/App.css";

function App() {
  //Todos los colores del fondo han sido pedidos a la inteligencia artificial
  const pestañas = ["Personal", "Inventario", "Incidencias"];

  const [seccion, setSeccion] = useState<string>("Personal");

  return (
    <div className="app">
      <Header />

      <div className="cuerpo">
        <nav className="sidebar">
          {pestañas.map((pestaña) => (
            <SidebarItem
              key={pestaña}
              titulo={pestaña}
              activo={seccion === pestaña}
              onClick={() => setSeccion(pestaña)}
            />
          ))}
        </nav>

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