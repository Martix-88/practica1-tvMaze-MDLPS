import { useState, useEffect } from 'react';
import './App.css';

import BarraBusqueda from './components/BarraBusqueda.jsx';
import DetalleSerie from './components/DetalleSerie.jsx';
import ListaSeries from './components/ListaSeries.jsx';
import ListaFavorita from './components/ListaFavorita.jsx';

function App() {
    const [series, setSeries] = useState([]); // Resultados de la búsqueda
    const [serieSeleccionada, setSerieSeleccionada] = useState(null); // Estado para guardar la serie seleccionada

    // Cargo los favoritos desde el localStorage si hay datos
    const [favoritos, setFavoritos] = useState(() => {
        const guardados = localStorage.getItem('misFavoritos');
        return guardados ? JSON.parse(guardados) : [];
    });

    // Guarda la lista de favoritos dentro del localStorage, si se recarga la página los favoritos no se pierden
    useEffect(() => {
        localStorage.setItem('misFavoritos', JSON.stringify(favoritos));
    }, [favoritos]);

    //Busco en la API de TV Maze
    const handleSearch = (texto) => {
        if (!texto || texto === '') return; // Si no hay texto no hago nada

        // Hago la petición con fetch
        fetch(`https://api.tvmaze.com/search/shows?q=${texto}`)
            .then((resultado) => resultado.json())
            .then((data) => {
                setSeries(data.map((item) => item.show));
            });
    };

    //Añadir o quitar un favorito
    const toggleFavorite = (serie) => {
        const existe = favoritos.some((fav) => fav.id === serie.id); // Comprueba que la serie ya está en favoritos con some para que devuelva el booleano

        if (existe) {
            // Si la serie ya está en favoritos se quita
            setFavoritos(favoritos.filter((fav) => fav.id !== serie.id));
        } else {
            // Sino se añade
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
                onViewDetails={(serie) => setSerieSeleccionada(serie)}
            />

            {/* Resultados */}
            <ListaSeries
                series={series}
                favoritos={favoritos}
                onToggleFavorite={toggleFavorite}
                onViewDetails={(serie) => setSerieSeleccionada(serie)}
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
