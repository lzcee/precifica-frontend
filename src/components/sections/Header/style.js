import styled from "styled-components";

import Logo from "../../reusables/Logo";
import { Container } from "../../../styles/global";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

export const Background = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 15;
  background-color: #192125;

  @media (min-width: 768px) {
    width: 260px;
  }
`;

export const FlexBox = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 58px;

  @media (min-width: 768px) {
    height: 88px;
    margin: 0;
    justify-content: center;
  }
`;

export const OpenMenuBtn = styled(GiHamburgerMenu)`
  fill: #ffffff;
  width: 24px;
  height: 24px;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const CloseMenuBtn = styled(MdClose)`
  fill: #ffffff;
  width: 30px;
  height: 30px;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const LogoIcon = styled(Logo)`
  font-size: 16px;
  margin: 0;

  svg {
    width: 20px;
    height: 20px;
  }

  @media (min-width: 768px) {
	font-size: 24px;
	position: relative;
    left: -10px;

    svg {
      width: 35px;
      height: 31px;
    }
  }
`;
