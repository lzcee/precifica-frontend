import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

export const FormWrapper = styled.div`
    position: relative;
    border-radius: 20px;
    background-color: #ececec;
    padding: 20px;
    box-sizing: border-box;
`;

export const Label = styled.p`
    font-weight: 700;
    margin: 12px 0;
`;

export const InputsWrap = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 12px;

    div:last-child {
        margin-bottom: 0;
    }
`;

export const AddInput = styled.button`
    border: 1px solid transparent;
    background: transparent;
    color: #192125;
    font-weight: 700;
    display: block;
    text-align: right;
    padding: 2px;
    margin: 0 0 12px auto;
    cursor: pointer;
    border-radius: 4px;
    transition: border-color 150ms linear;

    &:hover {
        border-color: #192125;
    }

    svg {
        fill: #192125;
        width: 1.25rem;
        height: 1.25rem;
        vertical-align: sub;
        margin-right: 6px;
    }
`;

export const ErrorMessage = styled.p`
    position: absolute;
    font-size: 12px;
    text-align: center;
    width: 100%;
    font-weight: 700;
    color: #cc4b4b;
    bottom: -30px;
`;

export const WrapSelect = styled(Autocomplete)`
    padding: 0;
    .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
        border-color: #cecece;
        outline-width: 0;
    }

    .MuiFormLabel-root.Mui-focused {
        color: #484848;
    }

    &:focus {
        border-color: #cecece;
        outline-width: 0;
    }
`;

export const Select = styled(TextField)`
    box-sizing: border-box;
    width: 100%;
    border: 2px solid transparent;
    border-radius: 4px;
    padding: 0;
`;

export const Total = styled.p`
    font-weight: 700;
    font-size: 16px;
    margin: 12px 0 24px;
`;

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
