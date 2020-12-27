import pages from "../../pages";
import { LOGIN_PATH, REGISTER_PATH, HOME_PATH, ORDER_PATH } from "./paths";

const PAGE_LOGIN = {
    component: pages.Login,
    path: LOGIN_PATH,
    isPrivate: false,
};

const PAGE_REGISTER = {
    component: pages.Register,
    path: REGISTER_PATH,
    isPrivate: false,
};

const PAGE_HOME = {
    component: pages.Home,
    path: HOME_PATH,
    isPrivate: true,
};

const PAGE_ORDER = {
    component: pages.Order,
    path: ORDER_PATH,
    isPrivate: true,
};

const routes = [PAGE_LOGIN, PAGE_REGISTER, PAGE_HOME, PAGE_ORDER];

export default routes;
