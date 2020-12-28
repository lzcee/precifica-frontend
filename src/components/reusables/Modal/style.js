import styled from "styled-components";

export const ModalWrapper = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #19212582;
`;

export const Content = styled.div`
    position: absolute;
    padding: 26px 46px 46px;
    box-sizing: border-box;
    width: 80%;
    max-width: 600px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    border-radius: 30px;
`;

export const CloseModal = styled.button`
    display: block;
    background-color: transparent;
    border: none;
    padding: 0;
    margin-left: auto;
    cursor: pointer;

    svg {
        width: 30px;
        height: 30px;
    }
`;
