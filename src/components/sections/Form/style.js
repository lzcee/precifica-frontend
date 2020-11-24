import styled from 'styled-components';

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

export { Wrapper, Title, FormWrapper, Button, ErrorMessage, RegisterNow };