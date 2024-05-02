import styled from "styled-components";

// Define un componente de botón personalizado
const Button = styled.button`
    background-color: #ffcccc;
    margin-top:10px;
    color: Black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Arial', sans-serif;
    &:hover {
        background-color: #ffaaaa;
    }
`;

export default Button;
