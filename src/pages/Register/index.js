import Form from '../../components/sections/Form';
import Logo from '../../components/reusables/Logo';

import { FullBackground } from '../../styles/global';

const Register = () => {
	return (
		<FullBackground>
			<Logo />
			<Form type="register" title="Cadastre-se" />
		</FullBackground>
	)
}

export default Register;