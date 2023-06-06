import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice.ts';

const Navbar: React.FC = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = () => {
		dispatch(logout());
		navigate('/');
	};

	return (
		<nav>
			<ul>
				{userInfo ? (
					<>
						<li>
							<Link to="/home">Accueil</Link>
						</li>
						<li>
							<Link to="/formation">Formation</Link>
						</li>
						<li>
							<Link to="/users">Utilisateurs</Link>
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
					<></>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
