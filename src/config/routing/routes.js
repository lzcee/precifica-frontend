import pages from '../../pages';
import { LOGIN_PATH } from './paths';

const PAGE_LOGIN = {
	component: pages.Login,
	path: LOGIN_PATH,
	isPrivate: false
}

const routes = [PAGE_LOGIN];

export default routes;