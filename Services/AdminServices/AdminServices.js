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
        const response = await API.get("/cars/all");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAllleads = async () => {
    try {
        const response = await API.get("/leads/get-leads");
        console.log("Leads API raw response:", response);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const getCarRefresh = async (slug) => {
    try {
        const response = await API.get(`/packages/items-consumption/${slug}`);
        console.log("Refresh API raw response:", slug, response);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editCarRefresh = async ({ id, quantity }) => {
    try {
        const response = await API.put(`/packages/items-consumption/${id}`, {
            quantity,
        });
        console.log("Refresh API raw response:", id, quantity, response);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const changeUserStatus = async ({ id, enable }) => {

    try {
        const response = await API.put(`/users/status/${id}`, {
            enable
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAllCars = async () => {
    try {
        const response = await API.get("cars");
        return response.data;
    } catch (error) {
        console.error("Error Vendor Fetch:", error);
        throw error;
    }
}

export const getAllLeads = async () => {
    try {
        const response = await API.get("leads/get-leads");
        return response.data;
    } catch (error) {
        console.error("Error Vendor Fetch:", error);
        throw error;
    }
}