import axios from "axios";
import API from "../Constants/api";

export const SearchServices = {
    // Search cars with filters
    filterCars: async (filters = {}) => {
        try {
            const queryParams = new URLSearchParams();

            const allParams = {
                category: filters.category,
                brand: filters.brand,
                body: filters.body,
                model: filters.model,
                city: filters.city,
                maxPrice: filters.maxPrice,
                specId: filters.specId,
                featureId: filters.featureId,
                transmissionId: filters.transmissionId,
                doorId: filters.doorId,
                bagFitId: filters.bagFitId,
                fuelTypeId: filters.fuelTypeId,
                colorId: filters.colorId,
                seatingCapacityId: filters.seatingCapacityId,
                makeYearId: filters.makeYearId,
                perPage: filters.perPage || '10',
                page: filters.page || '1'
            };

            Object.entries(allParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    queryParams.append(key, value);
                }
            });

            const res = await API.get(`/cars/search?${queryParams.toString()}`);
            return res.data;
        } catch (error) {
            console.error("Error searching cars:", error);
            throw error;
        }
    },

    // Advanced search with pagination
    paginatedSearch: async (filters = {}, page = 1, perPage = 10) => {
        try {
            // Create a copy of filters and add pagination
            const paginatedFilters = {
                ...filters,
                page: page.toString(),
                perPage: perPage.toString()
            };

            return await SearchServices.searchCars(paginatedFilters);
        }
        catch (error) {
            console.error("Error in paginated search:", error);
            throw error;
        }
    },

    // Get car suggestions based on query string
    getCarSuggestionsByQuery: async (query) => {
        try {
            if (!query) return [];

            const encodedQuery = encodeURIComponent(query);
            const res = await API.get(`/cars/suggestions?query=${encodedQuery}`);
            return res.data;
        }
        catch (error) {
            console.error("Error getting car suggestions:", error);
            throw error;
        }
    },

    // Get search suggestions based on keyword
    getSearchSuggestions: async (keyword) => {
        try {
            const res = await API.get(`/search/suggestions?keyword=${encodeURIComponent(keyword)}`);
            return res.data;
        }
        catch (error) {
            console.error("Error getting search suggestions:", error);
            throw error;
        }
    }
};