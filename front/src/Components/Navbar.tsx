import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, setCredentials } from '../slices/authSlice.ts';
import logo from '../../public/img/blanc-fond-gris.png';

const Navbar: React.FC = () => {
	const { userInfo } = useSelector((state) => state.auth);

	const [user, setUser] = useState([]);

	const dispatch = useDispatch();
	const navigate = useNavigate();
g
	useEffect(() => {

		fetch('http://localhost:3000/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token}
        })
		.then(response => response.json())
		.then(
			data => (setUser(data))
		);

		const storeduserInfo = localStorage.getItem('userInfo');
		const userInfo = storeduserInfo ? JSON.parse(storeduserInfo) : null;
		if (userInfo) {
			dispatch(setCredentials(userInfo));
		} else {
			navigate('/login');
			dispatch(logout());
		}
	}, [dispatch, navigate]);

	const logoutHandler = () => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<nav className="nav-bg-color">
			<ul>
				<li className="nav">
					<Link to="/home">
						<img className="logo" src={logo} alt="logo" />
					</Link>
				</li>
				{userInfo && userInfo.role === 'ADMINISTRATOR' ? (
					<>
						<li>{userInfo.email}</li>
						<li>
						<Link className="nav-text" to="/home">
								Accueil
						</Link>

						</li>
						<li>
							<Link className="nav-text" to="/missions">
								Missions
							</Link>
						</li>
						<li>
							<Link className="nav-text" to="/formation">
								Formations
							</Link>
						</li>
						<li>
							<Link className="nav-text" to="/users">
								Utilisateurs
							</Link>
						</li>
						<li>
							<Link className="nav-text" to="/profile">
								Profil
							</Link>
						</li>
						<li>
							<button onClick={logoutHandler} className='btn carbon-btn'>Déconnexion</button>
						</li>
					</>
				) : userInfo && userInfo.role === 'USER' ? (
					<>
						<li>{userInfo.email}</li>
						<li>
							<Link className="nav-text" to="/home">
								Accueil
							</Link>
						</li>
						<li>
							<Link className="nav-text" to="/profile">
								Profil
							</Link>
						</li>
						<li>
							<button onClick={logoutHandler} className='btn carbon-btn'>Déconnexion</button>
						</li>
					</>
				) : (
					<>
						<li>Interne</li>
						<li>
							<Link className="nav-text" to="/login">
								Connexion
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
