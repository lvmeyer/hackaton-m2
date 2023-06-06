import { useState } from 'react';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmitLogin = async (e: any) => {
		e.preventDefault();
		console.log('email');
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
