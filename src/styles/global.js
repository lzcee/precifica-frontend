import styled from "styled-components";

const FullBackground = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #192125;
    }
`;

const Container = styled.div`
    margin-left: 24px;
    margin-right: 24px;

    @media (min-width: 768px) {
        margin-left: 48px;
        margin-right: 48px;
    }

    @media (min-width: 1200px) {
        margin-left: 96px;
        margin-right: 96px;
    }

    @media (min-width: 1440px) {
        margin-left: calc((100% - 1174px) / 2);
        margin-right: calc((100% - 1174px) / 2);
    }
`;

const SectionTitle = styled.h2`
    font-size: 1.25rem;
    color: #192125;
    margin-bottom: 2rem;

    &:after {
        content: "";
        display: block;
        margin-top: 2px;
        width: 45px;
        height: 3px;
        background-color: #ff9324;
    }
`;

const Button = styled.button`
    width: 100%;
    border: none;
    font-weight: bold;
    background-image: linear-gradient(45deg, rgba(253, 90, 45, 1), rgba(253, 187, 45, 1));
    background-size: 150% 100%;
    color: #ffffff;
    border-radius: 4px;
    padding: 12px;
    cursor: pointer;
    transition: all 150ms linear;

    &:hover {
        background-position: 100% 0;
    }
`;

export { FullBackground, Container, SectionTitle, Button };
