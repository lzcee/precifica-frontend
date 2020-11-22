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

const ErrorMessage = styled.p`
	position: absolute;
    font-size: 12px;
    text-align: center;
    width: 100%;
    font-weight: 700;
    color: #cc4b4b;
    bottom: -20px;
`;

const RegisterNow = styled.p`
	text-align: center;
	margin-top: 34px;

	a {
		color: #16617d
	}

	a:hover {
		text-decoration: underline;
	}
`;

const Form = ({ type, title, ...props }) => {

	const [user, setUser] = useState({
		name: "",
		email: "",
		password: ""
	});
	const [error, setError] = useState("");

	const validateEmail = (email) => {
		var regex = /^[\w-s.]+@([\w-]+.)+[\w-]{2,4}$/;
		return regex.test(String(email).toLowerCase());
	};

	const validatePassword = (password) => {
		return password !== "" ? true : false;
	};

	const validateName = (name) => {
		return name !== "" ? true : false;
	};

	const validateFields = () => {
		console.log(user.email)
		if (type === 'register' && validateName(user.name) && validateEmail(user.email) && validatePassword(user.password)) {
			setError("");
			return true;
		}
		else if (type === 'login' && validateEmail(user.email) && validatePassword(user.password)) {
			setError("");
			return true;
		}
		else {
			setError("Ops! Verifique os campos antes de enviar!");
			return false;
		}
	}

	const handleChange = (event) => {
		setUser({
			...user,
			[event.target.name]: event.target.value
		});
	};

	const handleClick = (event) => {
		event.preventDefault();
		if (validateFields()) {
			console.log('api.post')
		}
	}

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
						placeholder="Nome"
					/>
				}
				<FormInput
					name="email"
					type="email"
					onChange={handleChange}
					value={user.email}
					placeholder="E-mail"
				/>
				<FormInput
					name="password"
					type="password"
					onChange={handleChange}
					value={user.password}
					placeholder="Senha"
				/>
				<Button type="submit" onClick={handleClick}>{type === 'login' ? 'Entrar' : 'Cadastrar'}</Button>
				<ErrorMessage>{error}</ErrorMessage>
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