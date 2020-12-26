import { BrowserRouter, Switch } from "react-router-dom";

import routes from "./config/routing/routes";
import AppRoute from "./AppRoute";
import { UserProvider } from "./config/contexts/auth";

import "./styles/common.css";
import "./styles/normalize.css";

const App = () => {
    return (
        <UserProvider>
            <BrowserRouter>
                <Switch>
                    {routes.map((route) => (
                        <AppRoute
                            key={route.path}
                            path={route.path}
                            exact={true}
                            component={route.component}
                            isPrivate={route.isPrivate}
                        />
                    ))}
                </Switch>
            </BrowserRouter>
        </UserProvider>
    );
};

export default App;
