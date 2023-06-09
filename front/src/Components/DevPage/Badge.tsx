const Badge = (props: any) => {
    console.log('entrée dans props', props)
	return (
		<>
            <p className="mb-1">{props.badge.badge}</p>
		</>
	);
};

export default Badge;
