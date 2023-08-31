import React from "react";
import CardGallery from "./cardGallery.jsx";

export const renderCardComponent = (categoryData, index, actionsVar) => {

	if (categoryData.key === "people"){
		return <CardGallery key={index} result={categoryData.data.results} title={"Characters"} header={"name"} attribute1={"gender"} attribute2={"hair_color"} attribute3={"eye_color"} actionGetUIDFromURL={actionsVar.getUIDFromURL} addRemoveFavourite={actionsVar.addRemoveFavourite} actionCheckFav={actionsVar.checkFavourite}/>
	}

	else if (categoryData.key === "films") {
		return <CardGallery key={index} result={categoryData.data.results} title={"Films"} header={"title"} attribute1={"director"} attribute2={"producer"} attribute3={"release_date"} actionGetUIDFromURL={actionsVar.getUIDFromURL} addRemoveFavourite={actionsVar.addRemoveFavourite} actionCheckFav={actionsVar.checkFavourite}/>
	}

	else if (categoryData.key === "starships") {
		return <CardGallery key={index} result={categoryData.data.results} title={"Starships"} header={"name"} attribute1={"manufacturer"} attribute2={"passengers"} attribute3={"starship_class"} actionGetUIDFromURL={actionsVar.getUIDFromURL} addRemoveFavourite={actionsVar.addRemoveFavourite} actionCheckFav={actionsVar.checkFavourite}/>
	}

	else if (categoryData.key === "vehicles") {
		return <CardGallery key={index} result={categoryData.data.results} title={"Vehicles"} header={"name"} attribute1={"manufacturer"} attribute2={"passengers"} attribute3={"vehicle_class"} actionGetUIDFromURL={actionsVar.getUIDFromURL} addRemoveFavourite={actionsVar.addRemoveFavourite} actionCheckFav={actionsVar.checkFavourite}/>
	}

	else if (categoryData.key === "species") {
		return <CardGallery key={index} result={categoryData.data.results} title={"Species"} header={"name"} attribute1={"classification"} attribute2={"average_height"} attribute3={"language"} actionGetUIDFromURL={actionsVar.getUIDFromURL} addRemoveFavourite={actionsVar.addRemoveFavourite} actionCheckFav={actionsVar.checkFavourite}/>
	}

	else {
		return <CardGallery key={index} result={categoryData} title={"Favourites"} header={"header"} attribute1={"1"} attribute2={"2"} attribute3={"3"} actionGetUIDFromURL={actionsVar.getUIDFromURL} addRemoveFavourite={actionsVar.addRemoveFavourite} actionCheckFav={actionsVar.checkFavourite}/>
	} 

}