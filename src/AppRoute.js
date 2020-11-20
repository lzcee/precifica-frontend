import { Route, Redirect } from 'react-router-dom';

import { LOGIN_PATH } from './config/routing/paths';

const AppRoute = ({ component: Component, path, isPrivate, ...props }) => {

	const { user } = true;
	const isAuthenticated = user ? true : false;

	return (
		<Route
			path={path}
			render={props => isPrivate && !isAuthenticated ? (<Redirect to={{ pathname: LOGIN_PATH }} />) : (<Component {...props} />)}
			{...props}
		/>
	)
}

export default AppRoute;