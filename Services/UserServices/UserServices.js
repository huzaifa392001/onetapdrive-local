import API from "../Constants/api"

export const getUserWishlistCars = async () => {
    try {
        const res = await API.get("/users/cars/wishlist")
        return res?.data;
    } catch (e) {
        console.error("Error getting all cars:", e);
        throw error;
    }
}

export const getUserViewedCars = async () => {
    try {
        const res = await API.get("/users/cars/viewed")
        return res?.data;
    } catch (e) {
        console.error("Error getting all cars:", e);
        throw error;
    }
}

export const toggleWishlist = async (id) => {
    try {
        const res = await API.post(`/users/car/wishlist/${id}`)
        return res?.data
    }
    catch (e) {
        console.error("Error getting all cars:", e);
        throw error;
    }
}