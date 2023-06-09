const Competence = (props: any) => {

	// Création du style CSS pour le dégradé de couleurs
	const progressStyle = {
		width: `${props.competences.points}%`,
		background: `linear-gradient(
			to right, 		
			#00ff00 0%,
			#ffff00 33%,
			#ff8000 66%,
			#ff0000 100%`,
	};
	return (
		<>
			<p className="mb-1">{props.competences.competence.competence}</p>
			<div className="d-flex flex-row">
				<div className="progress rounded">
					<div
						className="progress-bar"
						role="progressbar"
						style={progressStyle}
						aria-valuenow={props.competences.points}
						aria-valuemin={0}
						aria-valuemax={100}
					></div>
				</div>
				<p>XP: {props.competences.points} %</p>
			</div>
		</>
	);
};

export default Competence;
