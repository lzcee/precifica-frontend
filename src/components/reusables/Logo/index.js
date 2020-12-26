import { IoMdBusiness } from "react-icons/io";

import { LogoWrapper } from "./style";

const Logo = ({ className }) => {
  return (
    <LogoWrapper className={className}>
      <IoMdBusiness /> Precifica
    </LogoWrapper>
  );
};

export default Logo;
