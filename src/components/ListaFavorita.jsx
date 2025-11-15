import ItemSerie from './ItemSerie.jsx';

export default function ListaFavorita({
    favoritos,
    onToggleFavorite,
    onViewDetails,
}) {
    return (
        <div className="seccion-facvoritos">
            <h2 className="seccion-titulo">FAVORITOS</h2>

            {favoritos.length === 0 ? (
                <p className="mensaje-centro mensaje-favoritos-vacio">
                    No tienes series favoritas aun
                </p>
            ) : (
                <div className="show-grid">
                    {favoritos.map((serie) => (
                        <ItemSerie
                            key={serie.id}
                            serie={serie}
                            esFavorito={true}
                            onToggleFavorite={onToggleFavorite}
                            onViewDetails={onViewDetails}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
