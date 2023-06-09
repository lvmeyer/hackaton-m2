import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, setCredentials } from '../slices/authSlice.ts';
import logo from '../../public/img/blanc-fond-gris.png';

const Navbar: React.FC = () => {
	const { userInfo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const storedUserInfo = localStorage.getItem('userInfo');
		const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
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
					<></>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
