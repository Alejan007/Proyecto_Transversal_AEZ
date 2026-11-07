import { useState } from "react";
import "../styles/Header.css";

function Header() {
    const [hora, setHora] = useState(() => new Date().toLocaleTimeString());
    setInterval(() => {
        setHora(new Date().toLocaleTimeString());
    }, 1000);
    return (
        <header className="cabecera">
            <h1>NovaCorp</h1>
            <span>{hora}</span>
        </header>
    );
}

export default Header;