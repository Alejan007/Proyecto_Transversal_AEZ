import "../styles/SidebarItem.css";

interface SidebarItemProps {
    titulo: string;
    activo: boolean;
    onClick: () => void;
}

function SidebarItem({ titulo, activo, onClick }: SidebarItemProps) {
    return (
        <button className={`item-sidebar ${activo ? "activo" : ""}`} onClick={onClick}>
            {titulo}
        </button>
    );
}

export default SidebarItem;