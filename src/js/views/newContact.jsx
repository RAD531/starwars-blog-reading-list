import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ContactForm from "../component/contactForm.jsx";
import { Context } from "../store/appContext";


const NewContact = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    return (
        <>
            <div className='row flex-grow-1 p-5'>
                <ContactForm onChangeFormAction={actions.setContactInStore} submitFormAction={actions.createContactAction} navigateAway={navigate} navigateAwayTo={"/"} resetForm={actions.resetContact}></ContactForm>
                <div className="mb-3 text-start">
                    <a className="link-primary" role="button" onClick={() => navigate("/")}>or get back to contacts</a>
                </div>
            </div>
        </>
    )
};

export default NewContact;