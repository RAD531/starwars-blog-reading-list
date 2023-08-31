import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/details.css";
import { renderCardComponent } from "../component/renderCardComponent";

const Detail = () => {

    const { store, actions } = useContext(Context);
    const params = useParams();

    useEffect(() => {
        actions.resetCategoryItem();
        actions.getCategoryItemAction(params.category, params.id);
    }, []);

    if (store.categoryItem.url) {
        return (
            <>
                <section className="py-5">
                    <div className="container px-4 px-lg-5 my-5">
                        <div className="row gx-4 gx-lg-5 align-items-center">
                            <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg" alt="..." /></div>
                            <div className="col-md-6">
                                <div className="small mb-1">{params.category}</div>
                                <h1 className="display-5 fw-bolder">{store.categoryItem.name ? store.categoryItem.name : store.categoryItem.title}</h1>
                                <div className="fs-5 mb-5"><span className="text-decoration-line-through">$45.00</span><span>$40.00</span></div>
                                <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium at dolorem quidem modi. Nam sequi consequatur obcaecati excepturi alias magni, accusamus eius blanditiis delectus ipsam minima ea iste laborum vero?</p>
                            </div>
                        </div>

                        <div className="row mt-4 align-items-center">
                            <table>
                                <tbody>
                                    <tr>
                                        {Object.entries(store.categoryItem).slice(0, 6).map(([key, value], index) => (
                                            <td key={index}>
                                                <span className="fw-bold">{key}</span>
                                                <br></br>
                                                {value}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="row mt-4">
                            {renderSimilarItems(store, actions, params.category)}
                        </div>
                    </div>

                </section>
            </>
        )
    }

    else {
        return (
            <>
                <img
                    src="https://i.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.webp"
                    width="100"
                    height="100"
                    className="giphy-embed"
                    style={{
                        display: 'block',
                        margin: '0 auto 10px',
                    }}
                />
            </>
        )
    }
};

const renderSimilarItems = (storeVar, actionsVar, category) => {

    const peopleCategory = storeVar.categories.find(catItem => catItem.key === category);

    if (peopleCategory.data.results) {
        return renderCardComponent(peopleCategory, 0, actionsVar)
    }

    else {
        return (
            <img
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
    }
}

export default Detail
