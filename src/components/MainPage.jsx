import styled from "styled-components";

// Estiliza el elemento <p> como `TextMP`
const TextMP = styled.p`
    margin: 3rem 2rem 0 2rem;
    font-weight: bold;
    font-size: 1.3rem;
`;

const MainPage = () => {
    return (
        <div>
            {/* Muestra el texto estilizado */}
            <TextMP>La página se está creando</TextMP>
        </div>
    );
};

export default MainPage;
