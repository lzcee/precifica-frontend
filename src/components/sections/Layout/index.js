import Header from "../Header";

import { Content } from "./style";

const Layout = ({ children, className }) => {
    return (
        <div className={className}>
            <Header />
            <Content>{children}</Content>
        </div>
    );
};

export default Layout;
