import { SET_CURRENT_LOCATION } from "@/Redux/Slices/General";
import API from "../Constants/api";

export const getCategories = async () => {
    try {
        const res = await API.get("/categories");
        return res?.data;
    } catch (e) {
        console.error("Error getting categories:", e);
    }
};

export const getBrands = async () => {
    try {
        const res = await API.get("/brands");
        return res?.data;
    } catch (e) {
        console.error("Error getting brands:", e);
    }
};

export const getCities = async () => {
    try {
        const res = await API.get("/cities");
        return res?.data;
    } catch (e) {
        console.error("Error getting cities:", e);
    }
};

export const getMakeYears = async () => {
    try {
        const res = await API.get("/make-years"); // Replace endpoint if it's different
        return res?.data;
    } catch (e) {
        console.error("Error getting make years:", e);
    }
};

export const getAllCars = async () => {
    try {
        const res = await API.get("/cars");
        return res?.data;
    } catch (e) {
        console.error("Error getting all cars:", e);
    }
};

export const getSingleCar = async (carId) => {
    try {
        const res = await API.get(`/cars/${carId}`);
        return res?.data;
    } catch (e) {
        console.error("Error getting single car:", e);
    }
};

export const setLocations = async (location) => {
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
}