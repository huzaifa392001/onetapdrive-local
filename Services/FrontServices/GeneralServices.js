import { SET_BRANDS, SET_CATEGORIES, SET_CURRENT_LOCATION } from "@/Redux/Slices/General";
import { store } from "@/Redux/Store";
import API from "../Constants/api";

export const GeneralServices = {
    setCategories: async () => {
        try {
            const res = await API.get("/categories");
            store.dispatch(SET_CATEGORIES(res?.data?.data));
        } catch (e) {
            console.error("Error setting categories:", e);
        }
    },

    setLocation: async (location) => {
        try {
            if (location) {
                // Use the user-provided location directly
                store.dispatch(SET_CURRENT_LOCATION(location));
                return;
            }

            // Fetch current location using geolocation API
            const getCurrentLocation = () => {
                return new Promise((resolve, reject) => {
                    if (!navigator.geolocation) {
                        return reject(new Error("Geolocation is not supported by your browser."));
                    }
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            resolve({ latitude, longitude });
                        },
                        (error) => reject(error),
                        { enableHighAccuracy: true, timeout: 10000 }
                    );
                });
            };

            const locationCoords = await getCurrentLocation();
            const { latitude, longitude } = locationCoords;

            // Fetch city name from latitude and longitude using a geocoding API
            const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();

            const city = data.city || "Unknown Location";

            store.dispatch(SET_CURRENT_LOCATION(city));
        } catch (e) {
            console.error("Error fetching location:", e);
        }
    },

    setBrands: async () => {
        try {
            const res = await API.get("/brands");
            store.dispatch(SET_BRANDS(res?.data?.data));
        } catch (error) {
            console.error("Error setting brands:", error);

        }
    }
};
