import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { renderCardComponent } from "../component/renderCardComponent";
import Favourites from "../component/favourites.jsx";

const Home = () => {

	console.log("Home component re-rendered");
	const { store, actions } = useContext(Context);

	return (
		<>
			<section className="py-5">
				<div className="container px-4 px-lg-5 mt-5">
					{store.categories.map((catItem, indexCat) => (
						catItem.data.results ? (
							renderCardComponent(catItem, indexCat, actions)
						) : (
							<img
								key={indexCat}
								src="https://i.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.webp"
								width="100"
								height="100"
								className="giphy-embed"
								style={{
									display: 'block',
									margin: '0 auto 10px',
								}}
							/>
						)
					))}

					<Favourites></Favourites>

				</div>
			</section>


		</>
	)
};

export default Home
