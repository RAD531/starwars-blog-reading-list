import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
import { Trash } from "react-bootstrap-icons";


const Navigation = () => {

    const { store, actions } = useContext(Context);

    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand">
                        <Link to="/">
                            <img src="https://1000logos.net/wp-content/uploads/2017/06/Star-Wars-Logo-1-500x281.png"
                                alt="Star Wars Logo" style={{ maxHeight: "80px" }} />
                        </Link>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse justify-content-end float-end" id="navbarSupportedContent">
                        <div className="btn-group">
                            <button type="button" className="btn btn-outline-dark dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                <i className="bi-cart-fill me-1"></i>
                                Favourites
                                <span className="badge bg-dark text-white ms-1 rounded-pill">{store.favourites.length}</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                                {store.favourites.map((favItem, indexFav) => (
                                    <li key={indexFav} className="dropdown-item">
                                        <Link to={actions.getUIDFromURL(favItem.url)} style={{textDecoration: "none"}}>
                                            {favItem.header}
                                        </Link>
                                        <Trash className="ps-1" style={{cursor: "pointer"}} onClick={() => actions.addRemoveFavourite(favItem)}></Trash>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navigation;