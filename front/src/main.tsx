import React from 'react';
import ReactDOM from 'react-dom/client';

import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import Login from './Vues/Login.tsx';
import Mission from './Vues/Missions/Missions.tsx';
import CreateMission from './Vues/Missions/form_create.tsx';
import CreateFormation from './Components/Create_Formation.tsx';

import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import Register from './Vues/Register.tsx';
import RegisterWebMaster from './Vues/RegisterWebMaster.tsx';
import Homepage from './Vues/Homepage.tsx';
import Profile from './Vues/Profile.tsx';
import WebAnalytics from './Vues/WebAnalytics.tsx';
import WebMasters from './Vues/Users/WebMasters.tsx';
import Formation from './Vues/Formation.tsx';
import Level from './Vues/Level.tsx';
import Users from './Vues/Users/Users.tsx';
import CreateUser from './Vues/Users/form_create.tsx';
import Home from './Vues/Homepage.tsx';
import TagView from './Vues/TagView.tsx';
import TunnelView from './Vues/TunnelView.tsx';
import NotFoundPage from './Vues/NotFound.tsx';
import RequireAuth from './Components/RequireAuth.tsx';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="/" element={<Homepage />} />
			<Route index={true} path="/login" element={<Login />} />
			<Route path="/home" element={<Home />} />
			<Route path="/register" element={<Register />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/web-analytics" element={<WebAnalytics />} />
			<Route path="/webmasters" element={<WebMasters />} />
			<Route path="/register-webmaster" element={<RegisterWebMaster />} />
			<Route path="/tags" element={<TagView />} />
			<Route path="/tunnels" element={<TunnelView />} />
			<Route path="/formation" element={<RequireAuth><Formation /></RequireAuth>} />
			<Route path="/formations/create" element={<RequireAuth><CreateFormation /></RequireAuth>} />
			<Route path="/missions" element={<RequireAuth><Mission /></RequireAuth>} />
			<Route path="/missions/create" element={<RequireAuth><CreateMission /></RequireAuth>} />
			<Route path="/level" element={<Level />} />
			<Route path="/users" element={<Users />} />
			<Route path="/users/create" element={<CreateUser />} />
			<Route path="*" element={<NotFoundPage />} />
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
