import { getAllContacts, getContact, createContact, updateContact, deleteContact, deleteContacts } from '../api/contacts/contactListApi.js';
import {checkIfName, checkIfEmail, checkIfPhoneNum, checkIfAddress} from '../validation/validation.js';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			notifications: [],

			form: null,

			newContact: {
				full_name: "",
				email: "",
				agenda_slug: "",
				address: "",
				phone: "",
				id: ""
			},

			agendaSlug: {
				agenda: "RyanContactList"
			},

			contacts: []
		},
		actions: {

			resetContact: (_id, _full_name, _email, _phone, _address) => {

				//try and find contact and update
				for (let contact of getStore().contacts) {
					if (contact.id === _id) {
						const contactStore = getStore().newContact;
						contactStore.full_name = contact.full_name;
						contactStore.email = contact.email;
						contactStore.address = contact.address;
						contactStore.phone = contact.phone;
						contactStore.id = contact.id;

						_full_name.current.value = contactStore.full_name;
						_email.current.value = contactStore.email;
						_address.current.value = contactStore.address;
						_phone.current.value = contactStore.phone;

						return;
					}
				}

				//no id found, create new contact with blank values
				const contactStore = getStore().newContact;
				contactStore.full_name = _full_name.current;
				contactStore.email = _email.current;
				contactStore.address = _address.current;
				contactStore.phone = _phone.current;
				contactStore.id = "";
			},

			setContactInStore: (property, value) => {
				const contact = getStore().newContact;
				contact[property] = value.current;
				setStore({ newContact: contact });
			},

			setNotificationTrigger: (trigger) => {
				const notificationStore = getStore().notification;
				notificationStore.triggerNotification = trigger;
				setStore(notificationStore);
				getActions().pushNotfication(notificationStore);
			},

			getNotifications: () => {
				return getStore().notifications;
			},

			pushNotfication: (_message, _notificationType) => {
				let today = new Date();
				let currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

				let updatedNotifications = getActions().getNotifications();
				updatedNotifications.push({ message: _message, notificationType: _notificationType, id: getActions().getNotifications().length, time: currentTime});
				setStore({ notifications: updatedNotifications });
			},

			removeNotification: (id) => {
				const updatedNotifications = getStore().notifications.filter((notification) => notification.id !== id);
				setStore({ notifications: updatedNotifications });
			},

			getAllContactsAction: async () => {
				const apiResponse = await getAllContacts(getStore().agendaSlug.agenda);

				if (getActions().valiateApiResponse(apiResponse, "Success, contacts fetched from api")) {
					setStore({ contacts: apiResponse });
				}
			},

			getContactAction: () => {

			},

			createContactAction: async () => {

				const contactStore = getStore().newContact;

				if (!getActions().processContactCheck(contactStore)){
					return;
				}

				//remove the id as this is not asked for in create and update contact
				delete contactStore.id;

				const apiResponse = await createContact(contactStore);

				if (getActions().valiateApiResponse(apiResponse, "Success, the contact was created")) {
					getActions().getAllContactsAction();
					return true;
				}
			},

			updateContactAction: async () => {

				const contactStore = getStore().newContact;

				if (!getActions().processContactCheck(contactStore)){
					return false;
				}

				//remove the id as this is not asked for in create and update contact
				let tempID = contactStore.id;
				delete contactStore.id;

				const apiResponse = await updateContact(contactStore, tempID);

				if (getActions().valiateApiResponse(apiResponse, "Success, the contact was updated")) {
					getActions().getAllContactsAction();
					return true;
				}

				return false;
			},

			processContactCheck: (contactStore) => {
				const agendaStoreSlug = getStore().agendaSlug;
				contactStore.agenda_slug = agendaStoreSlug.agenda;
				setStore({ contact: contactStore });

				let notValid = false;
				for (const property in contactStore) {
					if (contactStore[property].hasOwnProperty("value")) {
						const inputValid = getActions().validateInput(contactStore[property]);
						if (inputValid) {
							contactStore[property].classList.add("is-valid");
							contactStore[property].classList.remove("is-invalid");
							contactStore[property] = contactStore[property].value;
						}

						else {
							contactStore[property].classList.add("is-invalid");
							contactStore[property].classList.remove("is-valid");
							notValid = true;
						}
					}
				}

				if (notValid) {
					getActions().valiateApiResponse("Error: One of your inputs in invalid", "");
					return false;
				}

				return true;
			}, 

			deleteContactAction: async (_id) => {
				const apiResponse = await deleteContact(_id);

				if (getActions().valiateApiResponse(apiResponse, "Success, the contact was deleted")) {
					getActions().getAllContactsAction();
					return true;
				}

				return false;
			},

			deleteContactsAction: () => {

			},

			validateInput: (input) => {
				if (input === getStore().newContact.full_name){
					return checkIfName(input.value);
				}

				else if (input === getStore().newContact.email){
					return checkIfEmail(input.value);
				}

				else if (input === getStore().newContact.address){
					return checkIfAddress(input.value);
				}

				else if (input === getStore().newContact.phone){
					return checkIfPhoneNum(input.value);
				}

				return false;
			},

			valiateApiResponse: (apiResponse, successMessage) => {
				if (String(apiResponse).startsWith("Error:")) {
					getActions().pushNotfication(apiResponse, "danger");
					return false;
				}

				else {
					getActions().pushNotfication(successMessage, "success");
					return true;
				}
			}
		}
	};
};

export default getState;
