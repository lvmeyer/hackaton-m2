import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice.ts';
import logo from '../../public/img/blanc-fond-gris.png';

const Navbar: React.FC = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = () => {
		dispatch(logout());
		navigate('/');
	};

	return (
		<nav className="nav-bg-color">
			<ul>
				{userInfo ? (
					<>
						<li>
							<Link className="nav-text" to="/home">
								Accueil
							</Link>
						</li>
						<li>
							<Link to="/formation">Formation</Link>
						</li>
						<li>
							<Link className="nav-text" to="/users">
								Utilisateurs
							</Link>
						</li>
						<li>{userInfo.email}</li>
						<li>
							<Link to="/profile">Profile</Link>
						</li>
						<li>
							<button onClick={logoutHandler}>Logout</button>
						</li>
					</>
				) : (
					<>
						<li className="nav">
							<Link className="nav-logo" to="/login">
								Login
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
