import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { HOME_PATH, ORDER_PATH, PRODUCTS_PATH, REPORTS_PATH } from "../../../config/routing/paths";

import UserContext from "../../../config/contexts/auth";

import { ImHome3 } from "react-icons/im";
import { FaClipboardList, FaBox } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";

import { Nav, Wrap, ItemMenu, SelectLocale } from "./style";

const NavMenu = ({ open }) => {
    const { logout } = useContext(UserContext);
    const history = useHistory();

    const { i18n, t } = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    const getCurrentLng = () => i18n.language || window.localStorage.i18nextLng || "";

    const handleClick = () => {
        logout(history);
    };

    return (
        <Nav open={open}>
            <Wrap>
                <ItemMenu exact to={HOME_PATH}>
                    <ImHome3 />
                    {t("header.home")}
                </ItemMenu>
                <ItemMenu exact to={ORDER_PATH}>
                    <FaClipboardList />
                    {t("header.orders")}
                </ItemMenu>
                <ItemMenu exact to={PRODUCTS_PATH}>
                    <FaBox />
                    {t("header.products")}
                </ItemMenu>
                <ItemMenu exact to={REPORTS_PATH}>
                    <BsGraphUp />
                    {t("header.reports")}
                </ItemMenu>
                <SelectLocale value={getCurrentLng()} onChange={(e) => changeLanguage(e.target.value)}>
                    <option value="pt">{t("header.languages.pt")}</option>
                    <option value="en">{t("header.languages.en")}</option>
                </SelectLocale>
                <ItemMenu logout as="button" onClick={handleClick}>
                    <RiLogoutBoxRLine />
                    {t("header.logout")}
                </ItemMenu>
            </Wrap>
        </Nav>
    );
};

export default NavMenu;
