import API from "../Constants/api"

export const getAllUsers = async () => {
    try {
        const response = await API.get("/users");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAllVendors = async () => {
    try {
        const response = await API.get("/vendors");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAdminAllCars = async () => {
    try {
        const response = await API.get("/cars");
        return response.data;
    } catch (error) {
        throw error;
    }
}