import ItemSerie from './ItemSerie.jsx';

export default function ListaSeries({
    series,
    favoritos,
    onToggleFavorite,
    onViewDetails,
}) {
    return (
        <div className="seccion-series">
            <h2 className="seccion-titulo">Resultados de la busqueda</h2>

            {series.length === 0 ? (
                <p>No hay resultados</p>
            ) : (
                <div className="show-grid">
                    {series.map((item) => {
                        const serie = item.show ? item.show : item; //
                        const esFavorito = favoritos.some(
                            (f) => f.id === serie.id // Compruebo que la serie está en favoritos
                        );

                        return (
                            <ItemSerie
                                key={serie.id}
                                serie={serie}
                                esFavorito={esFavorito}
                                onToggleFavorite={onToggleFavorite}
                                onViewDetails={onViewDetails}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
