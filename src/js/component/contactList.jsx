import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import ContactForm from "./contactForm.jsx";
import { GeoAlt, Telephone, EnvelopeAtFill, PencilFill, Trash3Fill } from "react-bootstrap-icons";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ContactList = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [modalBody, setModalBody] = useState(null);
    const [modalHeaderText, setModalHeaderText] = useState(null);
    const [modalSubmitButton, setModalSubmitButton] = useState(null);
    const [modalSubmitButtonClass, setModalSubmitButtonClass] = useState(null);
    const [modalAction, setModalAction] = useState(null);
    const [contactID, setContactID] = useState(null);
    const toggle = () => setModal(!modal);

    return (
        <>
            {store.contacts.length > 0 ? <div className="row">
                <div className="row justify-content-end pt-2 ps-4 pe-4 m-0">
                    <button onClick={() => navigate("/newcontact")} type="button" className="btn-sm btn-success" style={{ width: "150px", height: "50px" }}>
                        Add New Contact
                    </button>
                </div>

                <div className="list-group p-4 m-0">
                    {store.contacts.map((item, index) => (
                        <div key={item.id} className="list-group-item list-group-item-action" aria-current="true">
                            <div className="row">
                                <div className="col col-md-2 d-flex align-items-center justify-content-center">
                                    <img src="https://people.com/thmb/vxe1G9DPTCtveVUnRi8kae2ubZA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/ryan-reynolds2-a11a11b5dbe94cbcae5795409a4a98c2.jpg" className="rounded-circle img-fluid" style={{ width: "100px", height: "100px" }} alt="Cinque Terre" />
                                </div>
                                <div className="col-5 col-md-7 text-start">
                                    <p className="p-0 ms-4 mt-0 me-0 mb-0">{item.full_name}</p>
                                    <GeoAlt></GeoAlt><small className="ms-2">{item.address}</small>
                                    <br></br>
                                    <Telephone></Telephone><small className="ms-2">{item.phone}</small>
                                    <br></br>
                                    <EnvelopeAtFill></EnvelopeAtFill><small className="ms-2">{item.email}</small>
                                </div>
                                <div className="col-md-3">
                                    <PencilFill className="ms-2 me-2" role="button" onClick={() => { setModalBody(<ContactForm onChangeFormAction={actions.setContactInStore} submitFormAction={null} resetForm={actions.resetContact} id={item.id}></ContactForm>); setModalHeaderText("Edit Contact"); setModalSubmitButton("Confirm Edit"); setModalSubmitButtonClass("success"); setModalAction("EDIT"); toggle(); }}></PencilFill><Trash3Fill className="ms-2 me-2" role="button" onClick={() => { setModalHeaderText("Delete Contact"); setModalBody("Are you sure you want to delete this contact?"); setModalSubmitButton("Confirm Delete"); setModalSubmitButtonClass("danger"); setModalAction("DELETE"); setContactID(item.id); toggle(); }}></Trash3Fill>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> :

                <>
                    <p>No Contacts Found, Please Create a Contact</p>

                    <div className="row justify-content-center pt-2 ps-4 pe-4 m-0">
                        <button onClick={() => navigate("/newcontact")} type="button" className="btn-sm btn-success" style={{ width: "150px", height: "50px" }}>
                            Add New Contact
                        </button>
                    </div>
                </>
            }

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{modalHeaderText}</ModalHeader>
                <ModalBody>
                    {modalBody}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>
                        Cancel
                    </Button>{' '}
                    <Button color={modalSubmitButtonClass} onClick={async () => {
                        if (modalAction === "EDIT") {
                            if (await actions.updateContactAction()) {
                                toggle();
                            }
                        }

                        else if (modalAction === "DELETE") {
                            if (await actions.deleteContactAction(contactID)) {
                                toggle();
                            }
                        }
                    }}>
                        {modalSubmitButton}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
};

export default ContactList;