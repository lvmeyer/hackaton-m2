import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';

function App() {
	return (
		<>
			<Navbar />
			<ToastContainer />
			<Outlet />
		</>
	);
}

export default App;
