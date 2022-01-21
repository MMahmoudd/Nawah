import Repository from "./Repository";

const resource = "/currencies";

export default {
    async getItem(id) {
        const response = await Repository.get(`/currency-full-trans/${id}`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async getAllCurrenciesRate() {
        const response = await Repository.get(`/currency-rate`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async updateItem(id, data) {
        try {
            const response = await Repository.put(`/currency/${id}`, data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response;
        }
    },
    async deleteItem(id) {
        const response = await Repository.delete(`/currency/${id}`);
        if (response.data) {
            return response.data;
        }
    },
    async getAllItems(page, limit, filters = {}) {
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&title=' + filters.searchQuery : '';
        let filterQuery = searchQuery;
        const response = await Repository.get(`${resource}?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
        if (response.data.status === 200) {
            return response.data;
        }
    },

    async newItem(data) {
        try {
            const response = await Repository.post(`/currencies`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
};