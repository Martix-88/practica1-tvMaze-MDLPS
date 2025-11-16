import { useForm } from 'react-hook-form';

export default function BarraBusqueda({ onSearch }) {
    // Inicializo el formulario
    const { register, handleSubmit, reset } = useForm();

    // Función que se ejecuta al enviar el formulario
    function onSubmit(data) {
        onSearch(data.search); // Paso el prop con el valor del input
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="search-form">
            <input
                {...register('search')} // Registra el input
                type="text"
                placeholder="Buscar serie..."
                className="search-input"
            ></input>
            <button type="submit" className="search-boton">
                Buscar
            </button>
        </form>
    );
}
