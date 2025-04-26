import API from "../Constants/api"

export const getUserWishlistCars = async () => {
    try {
        const res = await API.get("/users/car/wishlist")
        return res?.data;
    } catch (e) {
        throw error;
    }
}

export const getSingleWishlistedCar = async (id) => {
    try {
        const res = await API.get(`/users/car/wishlist/${id}`)
        return res?.data;
    } catch (e) {
        throw error;
    }
}

export const getUserViewedCars = async () => {
    try {
        const res = await API.get("/users/car/viewed")
        return res?.data;
    } catch (e) {
        throw error;
    }
}

export const toggleWishlist = async ({ id, body }) => {
    try {
        const res = await API.post(`/users/car/wishlist/${id}`, body)
        return res?.data
    }
    catch (e) {
        throw error;
    }
}

export const viewedCar = async (id) => {
    try {
        const res = await API.post(`/users/car/viewed/${id}`)
        return res?.data
    }
    catch (e) {
        throw error;
    }
}