import Header from "../Header";

import { Content } from "./style";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Content>{children}</Content>
    </div>
  );
};

export default Layout;
