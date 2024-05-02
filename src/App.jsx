import { useEffect, useState } from 'react';
import './App.css';


import Header from './components/Header'
import ArtistData from './components/ArtistData';
import AlbumData from './components/AlbumData'
import styled from 'styled-components';

// Estilo para los álbumes
const StyledAlbums = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); // 3 columnas
    gap: 16px;
    margin-top: 2rem;
    
    /* Consulta de medios para cambiar a 2 columnas en pantallas más pequeñas */
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }

    /* Consulta de medios para cambiar a 1 columna en pantallas muy pequeñas */
    @media (max-width: 480px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const StyledTracks = styled.div`
    h2{
        color:black;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 30px;
    background-image: url('https://img.freepik.com/vector-gratis/onda-simbolos-musicales-sobre-fondo-blanco_1308-77408.jpg?w=826&t=st=1714518062~exp=1714518662~hmac=4f3477004863378bc4fb5461a642cdded8178a22deaa921912db5f398a9815a8');
    width: fit-content;
    font-weight: bold;
    padding: 0.5rem;
    box-shadow: -8px 22px 26px -3px rgba(0, 0, 0, 0.75);
    font-family: 'Special Elite', cursive;
`;

const PlayerImage = styled.img`
    width: 400px; 
    height: auto; 
    border-radius: 15px; 
    box-shadow: 0 4px 8px rgba(0,0,0,0.2); 
    transition: transform 0.3s ease-in-out; 
    
    &:hover {
        transform: scale(1.05); 
        filter: brightness(1.1); 
    }
`;

const CenterSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 2rem;
`;

function App() {
    const CLIENT_ID = '88a07ed136174f3fb934887c51500a2a';
    const CLIENT_SECRET = 'c31612670a884762b6005c8a5b240ceb';

    const [artistAlbums, setArtistAlbums] = useState([]);
    const [artistName, setArtistName] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [tracks, setTracks] = useState([]);
    const [limit] = useState(6); // Muestra 6 álbumes por página
    const [offset, setOffset] = useState(0);

    // Limpia y restablece los datos cada vez que se busca un nuevo artista
    const handleNewSearch = (artistName) => {
        setOffset(0);
        search(artistName);
    };

    useEffect(() => {
        const fetchAccessToken = async () => {
            const authParameters = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
            };

            const response = await fetch('https://accounts.spotify.com/api/token', authParameters);
            const data = await response.json();
            setAccessToken(data.access_token);
        };

        fetchAccessToken();
    }, []);

    const search = async (artistName) => {
        // Limpia los datos de artistAlbums antes de cargar nuevos
        setArtistAlbums([]);

        const artistParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        };

        try {
            // Realiza la consulta del artista para obtener su ID
            const artistResponse = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`, artistParameters);
            const artistData = await artistResponse.json();
            const artistID = artistData.artists.items[0].id;
            setArtistName(artistData.artists.items[0].name);

            // Realiza la consulta de los álbumes utilizando los parámetros limit y offset
            const albumResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&limit=${limit}&offset=${offset}`, artistParameters);
            const albumData = await albumResponse.json();
            setArtistAlbums(albumData.items);
        } catch (error) {
            console.error('Error fetching artist data:', error);
        }
    };

    const searchAlbum = async (albumID) => {
        const albumParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        };

        try {
            const response = await fetch(`https://api.spotify.com/v1/albums/${albumID}/tracks?limit=50`, albumParameters);
            const data = await response.json();
            setTracks(data.items);
        } catch (error) {
            console.error('Error fetching album tracks:', error);
        }
    };

    const nextPage = () => {
        setOffset(offset + limit);
    };

    const prevPage = () => {
        if (offset > 0) {
            setOffset(offset - limit);
        }
    };

    // Manejar actualizaciones en offset
    useEffect(() => {
        // Busca el artista nuevamente al cambiar offset
        search(artistName);
    }, [offset]);

    return (
        <div className="App">
            <Header search={handleNewSearch} setTracks={setTracks} />
            
            <h2>{artistName}</h2>
            <StyledAlbums>
                {artistAlbums.map((album, index) => (
                    <ArtistData
                        key={index}
                        title={album.name}
                        image={album.images[1].url}
                        searchAlbum={searchAlbum}
                        albumID={album.id}
                    />
                ))}
            </StyledAlbums>

            <div>
                <button onClick={prevPage} disabled={offset === 0}>Anterior</button>
                <button onClick={nextPage}>Siguiente</button>
            </div>

            <CenterSection>
                <StyledTracks>
                    <h2>Canciones del álbum seleccionado:</h2>
                    {tracks.map((track, index) => (
                        <AlbumData
                            key={index}
                            songName={track.name}
                            preview={track.external_urls.spotify}
                        />
                    ))}
                    <PlayerImage src='https://www.shutterstock.com/image-vector/play-pause-buttons-vector-icon-260nw-1819333712.jpg' alt='Reproductor' />
                </StyledTracks>
            </CenterSection>
        </div>
    );
}

export default App;
