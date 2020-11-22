import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import FormInput from '../../reusables/FormInput';

const Wrapper = styled.div`
	box-sizing: border-box;
	width: 100%;
	max-width: 300px;
	position: relative;
	background-color:#dddddd;
	backdrop-filter: blur(10px);
	border-radius: 30px;
	padding: 46px;

	@media(min-width: 768px) {
		max-width: 400px;
	}
`;

const Title = styled.h2`
	font-size: 1.25rem;
	margin-bottom: 24px;
	text-align: center;
	text-transform: uppercase;
`;

const FormWrapper = styled.form`
	position: relative;
`;

const Button = styled.button`
	width: 100%;
	border: none;
	font-weight: bold;
	background-image: linear-gradient(45deg,#23a6d5,#545454);
	background-size: 150% 100%;
	color: #ffffff;
	border-radius: 4px;
	padding: 12px;
	cursor: pointer;
	transition: all  150ms linear;

	&:hover {
		background-position: 100% 0;
	}
`;

const RegisterNow = styled.p`
	text-align: center;
	margin-top: 24px;
`;

const Form = ({ type, title, ...props }) => {

	const [user, setUser] = useState({
		user: {
			name: "",
			email: "",
			password: ""
		}
	})
	const [error, setError] = useState("");

	const handleChange = (event) => {
		const handleUser = user;
		handleUser[event.target.name] = event.target.value;
		setUser(handleUser);
	};

	return (
		<Wrapper>
			<Title>{title}</Title>
			<FormWrapper method="post">
				{type === 'register' &&
					<FormInput
						name="nome"
						type="text"
						onChange={handleChange}
						value={user.name}
						error={error}
						placeholder="Nome"
					/>
				}
				<FormInput
					name="email"
					type="email"
					onChange={handleChange}
					value={user.email}
					error={error}
					placeholder="E-mail"
				/>
				<FormInput
					name="password"
					type="password"
					onChange={handleChange}
					value={user.password}
					error={error}
					placeholder="Senha"
				/>
				<Button>{type === 'login' ? 'Entrar' : 'Cadastrar'}</Button>
			</FormWrapper>
			{type === 'login' &&
				<RegisterNow>
					Não tem uma conta? <Link>Cadastre-se</Link>
				</RegisterNow>
			}
		</Wrapper>
	)
}

export default Form;