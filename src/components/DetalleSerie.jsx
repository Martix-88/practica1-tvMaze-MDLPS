import { useEffect, useState } from 'react';

export default function DetalleSerie({
    serieId,
    onClose,
    onToggleFavorite,
    esFavorito,
}) {
    const [detalle, setDetalle] = useState(null);
    const [abierto, setAbierto] = useState(false);

    useEffect(() => {
        if (serieId) {
            fetch(`https://api.tvmaze.com/shows/${serieId}`)
                .then((resultado) => resultado.json())
                .then((data) => {
                    setDetalle(data);
                    setAbierto(true); // Abro el dialog con el detalle de la serie
                });
        }
    }, [serieId]);

    // Funcion para el cierre del dialog
    const handleClose = () => {
        setAbierto(false);
        setDetalle(null);
        onClose();
    };

    // Si no hay detalle o no está abierto el dialog entonces no muestra nada
    if (!abierto || !detalle) return null;

    return (
        <dialog open className="detalle-dialog">
            <form method="dialog">
                <img
                    src={detalle.image.original}
                    alt={detalle.name}
                    className="modal-imagen"
                />
                <h2>{detalle.name}</h2>
                <p>
                    <strong>Géneros:</strong> {detalle.genres.join(', ')}
                </p>
                <button
                    type="button"
                    onClick={() => onToggleFavorite(detalle)}
                    className={esFavorito ? 'btn-fav-quitar' : 'btn-fav-añadir'}
                >
                    {esFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                </button>

                <button
                    type="button"
                    onClick={handleClose}
                    className="btn-cerrar"
                >
                    Cerrar
                </button>
            </form>
        </dialog>
    );
}
