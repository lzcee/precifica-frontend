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


const Container = styled.div`
	margin-left: 24px;
	margin-right: 24px;

	@media (min-width: 768px) {
		margin-left: 48px;
		margin-right: 48px;
	}

	@media (min-width: 1200px) {
		margin-left: 96px;
		margin-right: 96px;
	}

	@media (min-width: 1440px) {
		margin-left: calc((100% - 1174px) / 2);
		margin-right: calc((100% - 1174px) / 2);
	}
`;

export { FullBackground, Container };