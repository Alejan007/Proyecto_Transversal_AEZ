import { useState } from "react";
import logo from "../assets/logo.svg";
import "../styles/Header.css";

function Header() {
    // Estado "hora": React recuerda este valor entre repintados.
    // useState(() => ...) calcula el valor inicial una sola vez.
    const [hora, setHora] = useState(() => new Date().toLocaleTimeString());

    // Código del enunciado: cada segundo guarda la hora nueva en el estado.
    // OJO: esto crea un intervalo nuevo en cada repintado (el enunciado dice
    // que tiene problemas y que se arreglará más adelante con useEffect).
    setInterval(() => {
        setHora(new Date().toLocaleTimeString());
    }, 1000);

    return (
        <header className="cabecera">
            {/* Parte izquierda: logo + nombre de la empresa */}
            <div className="cabecera-izquierda">
                <img src={logo} alt="Logo NovaCorp" className="logo" />
                <h1>NovaCorp</h1>
            </div>

            {/* Parte derecha: la hora */}
            <span>{hora}</span>
        </header>
    );
}

export default Header;