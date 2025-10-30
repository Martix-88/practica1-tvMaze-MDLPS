import { useState } from 'react';
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register('search')}
                type="text"
                placeholder="Buscar serie..."
            ></input>
            <button type="submit">Search</button>
        </form>
    );
}
