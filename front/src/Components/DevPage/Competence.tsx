import { useEffect, useState } from 'react';

const Competence = (props: any) => {
	const [level, setLevel] = useState(0);
	const [xp, setXp] = useState(0);

	useEffect(() => {
		const totalXp = props.competences.points;
		if (totalXp < 100) {
			setLevel(0);
			setXp(props.competences.points);
		} else {
			const x = props.competences.points % 100;
			setXp(x);

			const l = Math.trunc(props.competences.points / 100);
			setLevel(l);
		}
	}, []);

	const progressStyle = {
		width: `${xp}%`,
		background: `linear-gradient(
			to right, 		
			#00ff00 0%,
			#ffff00 33%,
			#ff8000 66%,
			#ff0000 100%`,
	};
	return (
		<>
			<p className='mb-1'>
				{props.competences.competence.competence} - Niveau: {level}
			</p>
			<div className='d-flex flex-row'>
				<div className='progress rounded'>
					<div
						className='progress-bar'
						role='progressbar'
						style={progressStyle}
						aria-valuemin={0}
						aria-valuemax={100}
						aria-valuenow={xp}
					></div>
				</div>
			</div>
			<div style={{ paddingTop: '.5em' }}>
				<p>XP: {xp} %</p>
			</div>
		</>
	);
};

export default Competence;
