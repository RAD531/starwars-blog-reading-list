import { BASE_URL, getAllCategory, getCategory, getCategoryItem } from '../api/starWars/starWarsApi.js';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			categories: [
				{ key: 'people', data: [] },
				{ key: 'films', data: [] },
				{ key: 'starships', data: [] },
				{ key: 'vehicles', data: [] },
				{ key: 'species', data: [] }
			],

			categoryItem: [],

			favourites: [],

			notifications: [],
		},

		actions: {

			getUIDFromURL: (_id) => {
				return _id.replace(BASE_URL, '');
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
				updatedNotifications.push({ message: _message, notificationType: _notificationType, id: getActions().getNotifications().length, time: currentTime });
				setStore({ notifications: updatedNotifications });
			},

			removeNotification: (id) => {
				const updatedNotifications = getStore().notifications.filter((notification) => notification.id !== id);
				setStore({ notifications: updatedNotifications });
			},

			addRemoveFavourite: (fav) => {
				if (fav.url) {
					if (getActions().checkFavourite(fav.url)) {
						getActions().removeFavourite(fav.url);
					}

					else {
						let favs = getStore().favourites;
						favs.push(fav);
						setStore({ favourites: favs });
					}

					getActions().saveToLocalStorage('favourites', getStore().favourites);
				}
			},

			checkFavourite: (_url) => {
				if (_url) {
					const found = getStore().favourites.some(item => item.url === _url);
					return found;
				}

				return false;
			},

			removeFavourite: (_url) => {
				if (_url) {
					let favs = getStore().favourites.filter(item => item.url !== _url);
					setStore({ favourites: favs });
					return true;
				}

				return false;
			},

			getFavourites: () => {
				const storedFavs = getActions().getLocalStorageItem('favourites');
				if (storedFavs){
					setStore({favourites: storedFavs});
				}
			},

			resetCategoryItem: () => {
				setStore({ categoryItem: [] });
			},

			getCategoryItemAction: async (_category, _id) => {
				if (_category === "people" || _category === "films" || _category === "starships" || _category === "vehicles" || _category === "species") {
					_id = _category + "/" + _id;

					const apiResponse = await getCategoryItem(_id);
					console.log(apiResponse);
					if (getActions().valiateApiResponse(apiResponse, "Success, contacts fetched from api")) {
						setStore({ categoryItem: apiResponse });
						return;
					}
				}

				return null;
			},

			getCategoryAction: async (nameOfCategory, id) => {
				const apiResponse = await getCategory(nameOfCategory, id);
				if (getActions().valiateApiResponse(apiResponse, "Success, contacts fetched from api")) {
					return apiResponse;
				}
			},

			getAllCategoryAction: async () => {

				//check local storage first
				const storedCategories = getActions().getLocalStorageItem('categories');
				if (storedCategories){
					setStore({ categories: storedCategories });
					return;
				}

				//if categories not stored
				for (let category of getStore().categories) {
					const apiResponse = await getAllCategory(category.key);

					if (getActions().valiateApiResponse(apiResponse, "Success, contacts fetched from api")) {
						category.data = apiResponse;
						let test = getStore().categories;
						setStore({ categories: test });

						// Storing categories in local storage
						getActions().saveToLocalStorage('categories', getStore().categories);
					}
				}
			},

			getLocalStorageItem: (fileName) => {
				return JSON.parse(localStorage.getItem(fileName));
			},

			saveToLocalStorage: (fileName, data) => {
				localStorage.setItem(fileName, JSON.stringify(data));
			},

			valiateApiResponse: (apiResponse, successMessage) => {
				if (String(apiResponse).startsWith("Error:")) {
					//getActions().pushNotfication(apiResponse, "danger");
					return false;
				}

				else {
					//getActions().pushNotfication(successMessage, "success");
					return true;
				}
			}
		}
	};
};

export default getState;
