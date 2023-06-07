import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Navbar from './Components/Navbar';

function App() {
	return (
		<>
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
