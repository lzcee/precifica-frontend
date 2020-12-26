import styled from "styled-components";

import { NavLink } from "react-router-dom";

export const Nav = styled.nav`
    z-index: 15;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
    top: 58px;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #192125;
    transition: transform 150ms ease-in-out;

    @media (min-width: 768px) {
        top: 88px;
        width: 260px;
        transform: translateX(0);
    }
`;

export const ItemMenu = styled(NavLink)`
    position: relative;
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding: 10px 24px;
    color: #ffffff;
    font-size: 16px;
    transition: color 150ms linear;
    cursor: pointer;

    svg {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        transition: fill 150ms linear;
    }

    &:hover {
        color: #ff9324;

        svg {
            fill: #ff9324;
        }
    }

    &.active {
        font-weight: bold;
        color: #ff9324;

        svg {
            fill: #ff9324;
        }
    }

    @media (min-width: 768px) {
        &.active {
            &::after {
                position: absolute;
                left: 0px;
                content: "";
                display: inline-block;
                height: 70%;
                width: 3px;
                background-color: #ff9324;
            }
        }
    }

    ${({ logout }) =>
        logout
            ? `
	  background-color: transparent;
	  border: none;
	  position: absolute;
	  width: 100%;
	  bottom: 0;
  `
            : ""}
`;

export const Wrap = styled.div`
    margin-top: 24px;

    @media (min-width: 768px) {
        margin: 30px 0;
    }
`;
