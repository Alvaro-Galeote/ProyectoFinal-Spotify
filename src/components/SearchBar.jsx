import React from "react";
import styled from "styled-components";

// Define el estilo para la barra de búsqueda
const InputBar = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    background-color: #fffccc;
    border-radius: 8px;
    padding: 0.5rem;
`;

// Define el estilo para el campo de entrada
const InputText = styled.input`
    padding: 0.5rem 3.5rem;
    text-align: center;
    border-radius: 50px;
    font-size: 1.2em;
    ::placeholder {
        color: black;
    }
`;

// Componente de barra de búsqueda
const SearchBar = (props) => {
    // Manejador de eventos de cambio de entrada
    const handleInputChange = (e) => {
        props.setVal(e.target.value);
    };

    return (
        <InputBar>
            <InputText
                placeholder="Busca a un artista"
                aria-label="Busca a un artista"  // Mejora la accesibilidad con aria-label
                required
                value={props.val}
                onChange={handleInputChange}
                type="text"
            />
        </InputBar>
    );
};

export default SearchBar;
