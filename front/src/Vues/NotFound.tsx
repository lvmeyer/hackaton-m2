import { useRouteError } from 'react-router-dom';
import logo from '../../public/img/blanc-fond-gris.png';

export default function NotFoundPage() {

	return (
		<div id="notfound-page" className='notfound'>
			<h1 className="h1-carbon">Oops!</h1>
			<p className="h1-carbon">404 Page non trouvée.</p>
            <img className='logo' src={logo} alt='logo' />
		</div>
	);
}
