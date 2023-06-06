import { Outlet } from 'react-router-dom';

import Navbar from './Components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";


function App() {
	return (
		<>
			<div>
				<div className='nav-app'>
					<Navbar />
				</div>
				<div className='content'>
					<Outlet />
				</div>
			</div>
			
		</>
	);
}

export default App;