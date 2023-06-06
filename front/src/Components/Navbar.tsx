import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/home">Accueil</Link>
				</li>
				{/* <li>
					<Link to="/formation">Formation</Link>
				</li> */}
				<li>
					<Link to="/users">Utilisateurs</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
