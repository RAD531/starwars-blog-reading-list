import React, { Component } from "react";
import ContactList from "../component/contactList.jsx";

export const Home = () => (
	<>
		<div className='row flex-grow-1 align-items-center p-5'>
			<div className="col">
				<ContactList></ContactList>
			</div>
		</div>
	</>
);
