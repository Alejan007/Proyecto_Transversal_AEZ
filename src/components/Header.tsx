import { useState } from "react";
import logo from "../assets/NovaCorp.png";
import "../styles/Header.css";

function Header() {
    const [hora, setHora] = useState(() => new Date().toLocaleTimeString());

    setInterval(() => { setHora(new Date().toLocaleTimeString()); }, 1000);

    return (
        <header className="cabecera">
            <div className="cabecera-izquierda">
                <img src={logo} alt="Logo NovaCorp" className="logo" />
                <h1>NovaCorp</h1>
            </div>
            <span className="hora">{hora}</span>
        </header>
    );
}

export default Header;