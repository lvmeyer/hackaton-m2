import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
	return (
		<>
			<Outlet />
			<div>
				<div className="nav-app">
					<Navbar />
				</div>
				<div className="content">
					<ToastContainer />
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default App;
