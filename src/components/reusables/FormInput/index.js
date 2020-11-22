import styled from 'styled-components';

const Wrapper = styled.div`
	position: relative;
	margin-bottom: 12px;
`;

const Input = styled.input`
	box-sizing: border-box;
	width: 100%;
	border: 2px solid transparent;
	border-radius: 4px;
	padding: 10px 12px;
	background-color: #ffffff;

	&:focus {
		border-color: #cecece;
    	outline-width: 0;
	}
`;

const ErrorMessage = styled.p`
	position: absolute;
	font-size: 12px;
`;

const FormInput = ({ name, type, onChange, value, error, placeholder, ...props }) => {
	return (
		<Wrapper>
			<Input id={name} type={type} onChange={onChange} value={value} placeholder={placeholder}/>
			{error && <ErrorMessage>{error}</ErrorMessage>}
		</Wrapper>
	)
}

export default FormInput;