import React, { useState } from 'react';
import { setCredentials } from '../slices/authSlice.ts';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



export default function Level() {
	const [level, setLevel] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const res = await fetch('http://localhost:3000/level', {
				mode: 'cors',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ level }),
			});

			dispatch(setCredentials({ ...res }));
		} catch (error: any) {
			console.error(error);
		}
	  };
	

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Level:
				<input type="text" value={level} onChange={(e) => setLevel(e.target.value)} />
			</label>
			<button type="submit">Envoyer</button>
		</form>
	);
}

