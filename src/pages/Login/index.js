import Form from "../../components/sections/Form";
import Logo from "../../components/reusables/Logo";

import { FullBackground, Container } from "../../styles/global";

const Login = () => {
    return (
        <FullBackground>
            <Container>
                <Logo />
                <Form type="login" title="Entrar" />
            </Container>
        </FullBackground>
    );
};

export default Login;
