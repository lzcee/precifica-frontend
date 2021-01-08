import styled from "styled-components";

export const Wrap = styled.div`
    max-width: 400px;
    padding: 40px;
    border-radius: 30px;
    background-color: #ffffff;
    margin: 30px auto 0 0;
`;

export const ResultTitle = styled.p`
    font-size: 1.25rem;
    margin-bottom: 15px;
    font-weight: 700;
`;

export const ResultContent = styled.p`
    font-size: 1.2rem;
    margin-bottom: 25px;

    &:last-of-type {
        margin-bottom: 40px;
    }
`;

export const Options = styled.div`
    max-width: 480px;
    padding: 40px;
    margin: 30px auto 0 0;

    span {
        display: inline-block;
        margin: 0 10px 0 6px;
    }

    a {
        display: inline-block;
        width: initial;
        margin-bottom: 10px;
    }
`;
