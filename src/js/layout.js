import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./views/home.jsx";
import Detail from "./views/detail.jsx";
import injectContext from "./store/appContext";

import Notification from "./component/notification.jsx";
import Navigation from './component/navigation.jsx';
import Header from "./component/header.jsx";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="container-fluid text-center d-flex min-vh-100 flex-column p-0">
			<BrowserRouter basename={basename}>
						<Notification />
						<Navigation/>
						<Header />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/:category/:id/" element={<Detail />} />
							<Route path="*" element={<h1>Not found!</h1>} />
						</Routes>
						<Footer />
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
