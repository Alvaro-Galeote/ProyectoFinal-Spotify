import React from "react";
import styled from "styled-components";

const SingleAlbum = styled.div`
    margin: 1.5rem;
    width: 300px;
    height: 350px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const AlbumTitle = styled.h2`
    text-align: center;
`;


const ArtistData = (props) => {
    const { title, image, albumID, searchAlbum } = props;

    const handleClick = () => {
        // Llama a la función `searchAlbum` para obtener pistas del álbum
        searchAlbum(albumID);
    };

    return (
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
            <img src={image} alt={title} />
            <h2>{title}</h2>
        </div>
    );
};

export default ArtistData;
