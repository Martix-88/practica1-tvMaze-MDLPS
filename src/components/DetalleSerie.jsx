import { useEffect, useState, useRef } from 'react';

export default function DetalleSerie({
    serieId,
    onClose,
    onToggleFavorite,
    esFavorito,
}) {
    const [detalle, setDetalle] = useState(null);
    const dialogRef = useRef(null);

    useEffect(() => {
        if (serieId) {
            fetch(`https://api.tvmaze.com/shows/${serieId}`)
                .then((resultado) => resultado.json())
                .then((data) => setDetalle(data));
        }
    }, [serieId]);

    useEffect(() => {
        if (detalle && dialogRef.current) {
            dialogRef.current.showModal();
        }
    }, [detalle]);

    const handleClose = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
            onClose();
            setDetalle(null);
        }
    };

    if (!detalle) return null;

    return (
        <dialog ref={dialogRef} className="detalle-dialog">
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
