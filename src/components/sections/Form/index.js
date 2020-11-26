import { useState } from 'react';
import { Link } from 'react-router-dom';

import { REGISTER_PATH } from '../../../config/routing/paths';

import FormInput from '../../reusables/FormInput';
import { Wrapper, Title, FormWrapper, Button, ErrorMessage, RegisterNow } from './style';

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
						name="name"
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
					Não tem uma conta? <Link to={{ pathname: REGISTER_PATH }}>Cadastre-se</Link>
				</RegisterNow>
			}
		</Wrapper>
	)
}

export default Form;