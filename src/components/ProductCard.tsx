import "../styles/ProductCard.css";

interface ProductCardProps {
    titulo: string;
    precio: number;
    imagen: string;
}

function ProductCard({ titulo, precio, imagen }: ProductCardProps) {
    return (
        <div className="tarjeta-producto">
            <img src={imagen} alt={titulo} className="imagen-producto" />
            <h3>{titulo}</h3>
            <p>{precio} $</p>
        </div>

    );
}
export default ProductCard;