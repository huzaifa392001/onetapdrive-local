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

export const getAdminAllCars = async ({ page = 1, perPage = 1000 }) => {
    try {
        const response = await API.get(`/cars/all?page=${page}&perPage=${perPage}`);
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

export const getPremiumCar = async ({ premium, vendorId, categoryId }) => {
    try {
        const params = new URLSearchParams();

        if (premium) params.append("premium", premium);
        if (vendorId) params.append("vendor_id", vendorId);
        if (categoryId) params.append("category_id", categoryId);

        const response = await API.get(`/cars/premium/listing?${params.toString()}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAdminDashboard = async () => {
    try {
        const response = await API.get("/dashboard/admin");
        return response.data;
    } catch (error) {
        console.error("Error fetching vendor dashboard data:", error);
        throw error;
    }
}

export const markPremium = async (id) => {
    try {
        const response = await API.post(`/cars/premium/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error marking car as premium:", error);
        throw error;
    }
}

export const removePremium = async (id) => {
    try {
        const response = await API.delete(`/cars/premium/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error marking car as premium:", error);
        throw error;
    }
}