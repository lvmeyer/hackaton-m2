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
			// const res = await level({ level }).unwrap();

			dispatch(setCredentials({ ...res }));
			// navigate('/home');
		} catch (error: any) {
			// toast.error(error.data.message);
			console.error(error);
		}
		// Envoyer les données du formulaire à la table "level"
		// Exécutez ici votre logique pour enregistrer les données dans votre base de données ou effectuer toute autre action souhaitée
		console.log('Données envoyées :', level);
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

// export default Level;