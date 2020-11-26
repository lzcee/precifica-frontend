import styled from 'styled-components';

const FullBackground = styled.div`
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

export { FullBackground };