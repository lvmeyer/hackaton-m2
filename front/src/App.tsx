import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Homepage from './Vues/Homepage';
import Formation from './Vues/Formation';
import Users from './Vues/Users';
import Login from './Vues/Login';
import Register from './Vues/Register';

import Navbar from './Components/Navbar';

function App() {

	return (
		<>
		    <Router>
				
				<div>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/formation" element={<Formation />} />
					<Route path="/users" element={<Users />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
					
				</div>
			</Router>
		</>
	);
}

export default App;
