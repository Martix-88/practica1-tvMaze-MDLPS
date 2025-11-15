export default function ItemSerie({
    serie,
    esFavorito,
    onToggleFavorite,
    onViewDetails,
}) {
    let tieneImagen = false;
    let imagenAPI = '';

    if (serie.image && serie.image.medium) {
        tieneImagen = true;
        imagenAPI = serie.image.medium;
    }

    const buttonClass = esFavorito ? 'btn-fav-remove' : 'btn-fav-add';

    return (
        <div className="serie-item">
            <div
                className="serie-image-container"
                onClick={() => onViewDetails(serie)}
            >
                {tieneImagen ? (
                    // Muestra la imagen si está disponible
                    <img
                        src={imagenAPI}
                        alt={`Poster de pelicula`}
                        className="serie-image"
                    />
                ) : (
                    // Muestra el placeholder de texto si no hay imagen
                    <div className="no-image-placeholder">
                        <span className="no-image-text">
                            IMAGEN NO DISPONIBLE
                        </span>
                        <span className="no-image-name">{serie.name}</span>
                    </div>
                )}
            </div>

            <div className="serie-info">
                <h3 className="serie-name">{serie.name}</h3>

                <button
                    onClick={() => onToggleFavorite(serie)}
                    className={buttonClass}
                >
                    {esFavorito ? 'Quitar' : 'Favorito'}
                </button>
            </div>
        </div>
    );
}
