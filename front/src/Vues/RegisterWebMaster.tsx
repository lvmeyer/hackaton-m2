import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';

function RegisterWebMaster() {
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();


	const handleSubmitRegisterMaster = async (e: any) => {
		e.preventDefault();

		try {
			const res = await fetch('http://localhost:3000/authentication/register-webmaster', {
				mode: 'cors',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password, firstname, lastname, role: 'WEBMASTER' }),
			});

            if (res.status === 201) {
				handleSubmitMail(email);
                toast.success('Votre demande a bien été prise en compte ! Un administrateur validera vos accès à la plateforme d\'ici peu. Vous pouvez déjà vous connecter et accéder au reste du site.', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                toast.error('Une erreur est survenue !', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }

		} catch (error: any) {
			toast.error(error.data.message);
			console.error(error);
		}
	};

	const handleSubmitMail = (email : string) => {
		const content =
			'Bonjour, heureux de vous savoir parmis nous, un admin va approuver votre demande de webmaster';

		const templateParams = {
			to_email: email,
			message: content,
		};

		emailjs.send(
			'service_s6zattj',
			'template_5166t5v',
			templateParams,
			'yo9yoU4Ew7UcO8d8p'
		);
	};

	return (
		<>
			<form className="login_form" onSubmit={handleSubmitRegisterMaster}>
				<h1 className="h1-carbon">Devenir Web Master</h1>

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
					type="text"
					placeholder="Entrez votre prénom"
					value={firstname}
					onChange={(e) => setFirstname(e.target.value)}
					className="form-control"
					/>
				</div>

				<div className="form-outline mb-4">
					<input
					type="text"
					placeholder="Entrez votre nom"
					value={lastname}
					onChange={(e) => setLastname(e.target.value)}
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

				<button type="submit" className="btn btn-primary btn-block mb-4">
					Faire la demande
				</button>
			</form>

		</>
	);
}

export default RegisterWebMaster;
