import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

function Inventario() {
    const [productos, setProductos] = useState<Product[]>([]);
    const [cargando, setCargando] = useState<boolean>(false);

    const cargarDatos = async (signal?: AbortSignal) => {
        setCargando(true);
        try {
            const respuesta = await fetch("https://fakestoreapi.com/products?limit=6", { signal });
            if (!respuesta.ok) {
                throw new Error(`Error en el servidor: ${respuesta.status}`);
            }
            const datos = await respuesta.json();
            setProductos(datos);
        } catch (error: unknown) {
            if (error instanceof Error && error.name !== "AbortError") {
                console.error("Error al cargar el inventario:", error.message);
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

    return (
        <>
            <button className="boton-cargar" onClick={() => cargarDatos()}>
                Recargar datos
            </button>

            {cargando ? (
                <p className="mensaje">Cargando datos del servidor…</p>
            ) : (
                <div className="grid">
                    {productos.map((p) => (
                        <ProductCard key={p.id} titulo={p.title} precio={p.price} imagen={p.image} />
                    ))}
                </div>
            )}
        </>
    );
}

export default Inventario;