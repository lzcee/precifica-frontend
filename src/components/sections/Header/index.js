import { useState } from "react";

import NavMenu from "../NavMenu";

import { Background, OpenMenuBtn, FlexBox, CloseMenuBtn, LogoIcon } from "./style";

function Header() {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <Background>
            <FlexBox>
                <LogoIcon />
                {openMenu && <CloseMenuBtn onClick={() => setOpenMenu(!openMenu)} />}
                {!openMenu && <OpenMenuBtn onClick={() => setOpenMenu(!openMenu)} />}
                <NavMenu open={openMenu} />
            </FlexBox>
        </Background>
    );
}

export default Header;
