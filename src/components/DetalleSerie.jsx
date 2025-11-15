import { useEffect, useState } from 'react';

export default function DetalleSerie({
    serieId,
    onClose,
    onToggleFavorite,
    esFavorito,
}) {
    const [detalle, setDetalle] = useState(null);

    useEffect(() => {
        if (serieId) {
            fetch(`https://api.tvmaze.com/shows/${serieId}`)
                .then((resultado) => resultado.json())
                .then((data) => setDetalle(data));
        }
    }, [serieId]);

    if (!detalle) return null;

    return (
        <div className="modal-serie" onClick={onClose}>
            <div className="contenido">
                <img
                    src={detalle.image.original}
                    alt={detalle.name}
                    className="imagen"
                />
                <h2 className="titulo">{detalle.name}</h2>
                <p>Generos: {detalle.genres.join(', ')}</p>

                <button
                    className="boton-fav"
                    onClick={() => onToggleFavorite(detalle)}
                >
                    {esFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                </button>

                <button className="boton-cerrar" onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
}
