import { Wrapper, Input } from './style';

const FormInput = ({ name, type, onChange, value, placeholder, ...props }) => {
	return (
		<Wrapper>
			<Input id={name} name={name} type={type} onChange={onChange} value={value} placeholder={placeholder} />
		</Wrapper>
	)
}

export default FormInput;