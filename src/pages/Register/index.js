import Form from '../../components/sections/Form';
import Logo from '../../components/reusables/Logo';

import { FullBackground, Container } from '../../styles/global';

const Register = () => {
	return (
		<FullBackground>
			<Container>
				<Logo />
				<Form type="register" title="Cadastre-se" />
			</Container>
		</FullBackground>
	)
}

export default Register;