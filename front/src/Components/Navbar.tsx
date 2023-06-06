import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/img/blanc-fond-gris.png'

const Navbar: React.FC = () => {
	return (
		<nav className='nav-bg-color'>
			<ul>
        <li className='nav'>
          <Link className='nav-logo' to="/login">
          </Link>
        </li>
				<li>
					<Link className='nav-text' to="/home">Accueil</Link>
				</li>
				{/* <li>
					<Link to="/formation">Formation</Link>
				</li> */}
				<li>
					<Link className='nav-text' to="/users">Utilisateurs</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
