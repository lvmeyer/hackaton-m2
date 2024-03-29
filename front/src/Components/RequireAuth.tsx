import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
	const { userInfo } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	if (userInfo && (userInfo.role === 'USER' )) {
		navigate('/home');
		return null;
	
	} else {
		return children;
	}
};

export default RequireAuth;