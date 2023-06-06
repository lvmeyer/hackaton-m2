import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../slices/usersApiSlice.ts';
import { setCredentials } from '../slices/authSlice.ts';
import { toast } from 'react-toastify';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading, error }] = useLoginMutation();

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
			const res = await login({ email, password }).unwrap();
			console.log('res', res);
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
			</form>
		</>
	);
}

export default Login;
