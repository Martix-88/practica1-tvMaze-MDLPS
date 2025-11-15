import { useState } from 'react';
import './App.css';

import BarraBusqueda from './components/BarraBusqueda.jsx';
import DetalleSerie from './components/DetalleSerie.jsx';
import ListaSeries from './components/ListaSeries.jsx';
import ListaFavorita from './components/ListaFavorita.jsx';

function App() {
    const [series, setSeries] = useState([]); // Resultados de la búsqueda
    const [serieSeleccionada, setSerieSeleccionada] = useState(null);
    const [favoritos, setFavoritos] = useState([]);

    //Busco en la API de TV Maze
    const handleSearch = async (texto) => {
        if (!texto || texto === '') return;

        const res = await fetch(
            `https://api.tvmaze.com/search/shows?q=${texto}`
        );
        const data = await res.json();

        setSeries(data.map((item) => item.show));
    };

    //Añadir o quitar un favorito
    const toggleFavorite = (serie) => {
        const existe = favoritos.some((fav) => fav.id === serie.id);

        if (existe) {
            setFavoritos(favoritos.filter((fav) => fav.id !== serie.id));
        } else {
            setFavoritos([...favoritos, serie]);
        }
    };

    return (
        <div className="app-contenedor">
            <h1 className="titulo-app">Buscador de Series</h1>

            {/* Barra de busqueda */}
            <BarraBusqueda onSearch={handleSearch} />

            {/* Lista Favoritos */}
            <ListaFavorita
                favoritos={favoritos}
                onToggleFavorite={toggleFavorite}
                onViewDetails={setSerieSeleccionada}
            />

            {/* Resultados */}
            <ListaSeries
                series={series}
                favoritos={favoritos}
                onToggleFavorite={toggleFavorite}
                onViewDetails={setSerieSeleccionada}
            />

            {/* Detalle de la serie */}
            {serieSeleccionada && (
                <DetalleSerie
                    serieId={serieSeleccionada.id}
                    esFavorito={favoritos.some(
                        (f) => f.id === serieSeleccionada.id
                    )}
                    onToggleFavorite={toggleFavorite}
                    onClose={() => setSerieSeleccionada(null)}
                />
            )}
        </div>
    );
}

export default App;
