import styled from 'styled-components';

import Form from '../../components/sections/Form';
import { IoMdBusiness } from 'react-icons/io';

const Layout = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	&::before {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: linear-gradient(44deg, #7434cc, #6a556a, #23a6d5, #23d5ab);
		background-size: 400% 400%;
		animation: gradient 18s ease infinite;
	}

	@keyframes gradient {
		0% {
			background-position: 15% 0%;
		}
		50% {
			background-position: 88% 100%;
		}
		100% {
			background-position: 15% 0%;
		}
	}
`;

const Logo = styled.h1`
	z-index: 1;
	text-transform: uppercase;
	color: #ffffff;
`;

const Login = () => {
	return (
		<Layout>
			<Logo><IoMdBusiness/> Precifica</Logo>
			<Form type="login" title="Entrar" />
		</Layout>
	)
}

export default Login;