import { useState } from 'react';

function App() {
	const [count, setCount] = useState(0);

	async function testApi() {
		const response = await fetch('http://0.0.0.0:3000/users/ping');
		const msg = await response.json();
		alert(msg.message);
	}

	return (
		<>
			<h1>Vite + React</h1>
			<button onClick={testApi}>Ping</button>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
