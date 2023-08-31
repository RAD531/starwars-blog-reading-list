import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { renderCardComponent } from "../component/renderCardComponent";

const Favourites = () => {

    const { store, actions } = useContext(Context);

    return (
        <>
            {store.favourites.length > 0 ?
                renderCardComponent(store.favourites, 0, actions) : null
            }
        </>
    )
};

export default Favourites