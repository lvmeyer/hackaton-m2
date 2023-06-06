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
			navigate('/home');
		}
	}, [navigate, userInfo]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSubmitLogin = async (e: any) => {
		e.preventDefault();

		try {
			// const res = await fetch('http://localhost:3000/authentication/login', {
			// 	mode: 'cors',
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	body: JSON.stringify({ email, password }),
			// });
			const res = await login({ email, password }).unwrap();

			dispatch(setCredentials({ ...res }));
			navigate('/home');
		} catch (error: any) {
			toast.error(error.data.message);
			console.log(error);
		}
	};

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={handleSubmitLogin}>
				<input
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button type="submit">Sign in</button>
				{isLoading && <h2>Loading...</h2>}
			</form>
		</>
	);
}

export default Login;
