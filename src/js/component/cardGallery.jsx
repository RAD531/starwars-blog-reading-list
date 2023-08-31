import React from "react";
import { Heart } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';

const CardGallery = ({ result, title, header, attribute1, attribute2, attribute3, actionGetUIDFromURL, addRemoveFavourite, actionCheckFav }) => {

    return (
        <>
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center pb-4">
                <h3 className="justify-content-start p-2" style={{ color: "#8B0000" }}>{title}</h3>
                <div className="list-group list-group-horizontal position-relative overflow-auto w-100">
                    {result.map((innerCatItem, indexInnerCat) => (
                        <div key={indexInnerCat} className="list-group-item">
                            <div className="col mb-5">
                                <div className="card">
                                    {/* Product image */}
                                    <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." style={{ width: "300px", height: "200px" }} />
                                    {/* Product details */}
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            {/* Product name */}
                                            <h5 className="fw-bolder">{innerCatItem[header]}</h5>
                                            {/* Product description */}
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">{attribute1 + ": " + innerCatItem[attribute1]}</li>
                                                <li className="list-group-item">{attribute2 + ": " + innerCatItem[attribute2]}</li>
                                                <li className="list-group-item">{attribute3 + ": " + innerCatItem[attribute3]}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* Product actions */}
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="row">
                                            <div className="col-6">
                                                <Link to={actionGetUIDFromURL(innerCatItem["url"])}>
                                                    <div className="text-center"><a className="btn btn-outline-dark mt-auto">View Item</a></div>
                                                </Link>
                                            </div>
                                            <div className="col-6">
                                                <button className={actionCheckFav(innerCatItem["url"]) ? "btn btn-outline-warning" : "btn btn-outline-danger"} href="#" type="button" onClick={() => { addRemoveFavourite({url: innerCatItem["url"], header: innerCatItem[header], 1: innerCatItem[attribute1], 2: innerCatItem[attribute2], 3: innerCatItem[attribute3]})}}>
                                                    <Heart className="ms-2 me-2" fill="currentColor"></Heart>
                                                    {actionCheckFav(innerCatItem["url"]) ? "Unlike" : "Like"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CardGallery;