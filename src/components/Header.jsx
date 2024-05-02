import React, { useState } from "react";
import SearchBar from "./SearchBar";
import styled from "styled-components";


import Button from "./Button";

const HeaderStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction:column;
    justify-content: space-evenly;
    background-color: #ffccc;
    padding-bottom: 15px;
`;

const TitleHeader = styled.h1`
    color: black;
    font-family: 'Arial', sans-serif;
`;

const Header = (props) => {
    const { search, setTracks } = props;
    const [artistInput, setArtistInput] = useState("");

    // Función para manejar la búsqueda
    const handleSearch = () => {
        search(artistInput);
        setTracks([]);
    };

    return (
        <HeaderStyle>
            <div>
                 <SearchBar
                val={artistInput}
                setVal={setArtistInput}
                />
            
            <Button onClick={handleSearch} aria-label="Buscar artistas">
                Buscar
            </Button>
            </div>
           

            <TitleHeader>Albums</TitleHeader>
        </HeaderStyle>
    );
};

export default Header;
