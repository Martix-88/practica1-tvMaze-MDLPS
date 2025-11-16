export default function ItemSerie({
    serie,
    esFavorito,
    onToggleFavorite,
    onViewDetails,
}) {
    // Compruebo que la serie tiene imagen
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
                    // Muestra el texto alternativo en caso de que no haya imagen
                    <div>
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
