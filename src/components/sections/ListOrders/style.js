import styled from "styled-components";

export const Item = styled.p`
    margin-bottom: 10px;

    span {
        font-weight: 700;
    }
`;

export const InputItem = styled.div`
    margin: 0 0 10px 20px;

    span {
        font-weight: 700;
    }

    p {
        margin-left: 10px;
    }
`;

export const FlexWrap = styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: space-between;

    button {
        width: calc(50% - 10px);
    }
`;
