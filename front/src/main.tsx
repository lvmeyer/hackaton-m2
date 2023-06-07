import React from 'react';
import ReactDOM from 'react-dom/client';

import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import Login from './Vues/Login.tsx';
import Mission from './Vues/Missions/Missions.tsx';
import CreateMission from './Vues/Missions/form_create.tsx';
// import Formation from './Vues/Formation.tsx';

import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import Register from './Vues/Register.tsx';
import Homepage from './Vues/Homepage.tsx';
import Profile from './Vues/Profile.tsx';
import Formation from './Vues/Formation.tsx';
import Developer from './Vues/Developer.tsx';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/login" element={<Login />} />
			<Route path="/home" element={<Homepage />} />
			<Route path="/register" element={<Register />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/formation" element={<Formation />} />
			<Route path="/missions" element={<Mission />} />
			<Route path="/missions/create" element={<CreateMission />} />
			<Route path="/developer" element={<Developer />} />
			{/* <Route path="/profile" element={<Profile />} /> */}
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</Provider>
);
