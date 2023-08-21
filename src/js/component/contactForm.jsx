import React, { useEffect, useRef } from "react";

const ContactForm = ({ onChangeFormAction, submitFormAction, navigateAway, navigateAwayTo, resetForm, id }) => {

    const full_name = useRef(null);
    const email = useRef(null);
    const number = useRef(null);
    const address = useRef(null);

    useEffect(() => {
        resetForm(id, full_name, email, number, address);
    }, []);


    return (
        <>
            <div className="col">
                <div className="row justify-content-center">
                    <form className="ms-5 me-5 w-75">
                        {submitFormAction !== null && (
                            <legend>Create New Contact</legend>
                        )}
                        <div className="mb-3 text-start">
                            <label htmlFor="full-name" className="form-label">Full Name</label>
                            <input type="text" ref={full_name} onChange={() => onChangeFormAction("full_name", full_name)} className="form-control" id="input-full-name" aria-describedby="nameHelp" placeholder="Enter your full name here" />
                            <div className="invalid-feedback">Please choose a valid name.</div>
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="input-email" className="form-label">Email address</label>
                            <input type="email" ref={email} onChange={() => onChangeFormAction("email", email)} className="form-control" id="input-email" aria-describedby="emailHelp" placeholder="Enter your email here" />
                            <div className="invalid-feedback">Please choose a valid name.</div>
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="input-number" className="form-label">Phone Number</label>
                            <input type="text" ref={number} onChange={() => onChangeFormAction("phone", number)} className="form-control" id="input-number" aria-describedby="numberHelp" placeholder="Enter your phone number here" />
                            <div className="invalid-feedback">Please choose a valid name.</div>
                        </div>

                        <div className="mb-3 text-start">
                            <label htmlFor="input-address" className="form-label">Address</label>
                            <input type="text" ref={address} onChange={() => onChangeFormAction("address", address)} className="form-control" id="input-address" aria-describedby="addressHelp" placeholder="Enter your address number here" />
                            <div className="invalid-feedback">Please choose a valid name.</div>
                        </div>

                        {submitFormAction !== null && (
                            <div className="mb-3">
                                <button type="button" onClick={async () => {
                                    let result = await submitFormAction();
                                    if (result) {
                                        navigateAway(navigateAwayTo);
                                    }
                                }} className="btn btn-primary w-100">Submit</button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}

export default ContactForm;