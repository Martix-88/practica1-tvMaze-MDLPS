import { useForm } from 'react-hook-form';

export default function BarraBusqueda({ onSearch }) {
    // Inicilizamos el formulario
    const { register, handleSubmit, reset } = useForm();

    // Función que se ejecuta al enviar el formulario
    function onSubmit(data) {
        onSearch(data.search);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="search-form">
            <input
                {...register('search')}
                type="text"
                placeholder="Buscar serie..."
                className="search-input"
            ></input>
            <button type="submit" className="search-button">
                Search
            </button>
        </form>
    );
}
