import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../slices/usersApiSlice.ts';
import { setCredentials } from '../slices/authSlice.ts';
import { toast } from 'react-toastify';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading }] = useLoginMutation();

	const { userInfo } = useSelector((state) => state.auth);
	useEffect(() => {
		if (userInfo) {
			navigate('/profile');
		}
	}, [navigate, userInfo]);

	const handleSubmitLogin = async (e: any) => {
		e.preventDefault();

		try {

			const res = await login({ email, password }).unwrap();

			dispatch(setCredentials({ ...res }));
			navigate('/profile');
		} catch (error: any) {
			toast.error(error.data.message);
			console.error(error);
		}
	};

	return (
		<>
			<form className="login_form" onSubmit={handleSubmitLogin}>
				<h1 className="h1-carbon">Login</h1>
				<div className="form-outline mb-4">
					<input
					type="email"
					placeholder="Entrez votre email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="form-control"
					/>
				</div>

				<div className="form-outline mb-4">
					<input
					type="password"
					placeholder="Entrez votre mot de passe"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="form-control"
					/>
				</div>

				<div className="row mb-4">
					<div className="col d-flex justify-content-center">
					<div className="form-check">
						<input
						className="form-check-input"
						type="checkbox"
						value=""
						id="form2Example34"
						checked
						/>
						<label className="form-check-label h1-carbon">Se souvenir de moi</label>
					</div>
					</div>
				</div>

				<button type="submit" className="btn btn-primary btn-block mb-4">
					Se connecter
				</button>
				{isLoading && <h2>Loading...</h2>}
			</form>

		</>
	);
}

export default Login;
