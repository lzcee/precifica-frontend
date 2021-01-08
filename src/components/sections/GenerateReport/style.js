import styled from "styled-components";

export const Title = styled.p`
    font-size: 16px;
    margin-bottom: 12px;
    font-weight: 700;
    color: #904c07;
`;

export const Label = styled.p`
    font-size: 14px;
    font-weight: 700;
    margin: 6px 0;
`;

export const ErrorMessage = styled.p`
    position: absolute;
    font-size: 12px;
    width: 100%;
    font-weight: 700;
    color: #cc4b4b;
    bottom: -30px;
`;

export const FlexWrap = styled.div`
    position: relative;

    @media (min-width: 768px) {
        div {
            display: inline-block;
            margin-right: 10px;
            width: 210px;
        }
    }
`;

export const Wrap = styled.div`
    max-width: 400px;
    padding: 40px;
    border-radius: 30px;
    background-color: #ffffff;
    margin: 4rem auto 0 0;
`;

export const ResultTitle = styled.p`
    font-size: 1.25rem;
    margin-bottom: 15px;
    font-weight: 700;
`;

export const ResultContent = styled.p`
    font-size: 1.2rem;

    &:not(:last-child) {
        margin-bottom: 25px;
    }
`;
