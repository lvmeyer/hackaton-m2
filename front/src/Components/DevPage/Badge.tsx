import 'bootstrap/dist/css/bootstrap.min.css';

const Badge = (props: any) => {
	return (
		<>
			<div className='d-flex flex-row align-items-center mb-1'>
				<div className='mb-0 '>
					<div className='badges text-sm font-weight-bold'>
						<img
							className='logo'
							src={props.badges.path_img}
							style={{ width: '30px', paddingRight: '10px' }}
						/>
						{props.badges.badge}
					</div>
				</div>
			</div>
		</>
	);
};

export default Badge;
