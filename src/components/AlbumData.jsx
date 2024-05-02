import React from "react";
import styled from "styled-components";

// Define un contenedor estilizado para la canción
const SongContainer = styled.div`
    margin-top: 1rem; // Aplica un margen superior de 1 rem
    /* Puedes ajustar este valor según tus preferencias */
`;

const AlbumData = (props) => {
    const { songName, preview } = props;

    // Verifica que preview sea una URL válida antes de usar window.open
    const handlePreviewClick = () => {
        if (preview) {
            window.open(preview, '_blank');
        }
    };

    return (
        <SongContainer>
            {/* Usa una etiqueta button para mejorar la accesibilidad */}
            <button onClick={handlePreviewClick}>
                {songName}
            </button>
        </SongContainer>
    );
};

export default AlbumData;
