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

export { Wrapper, Input };