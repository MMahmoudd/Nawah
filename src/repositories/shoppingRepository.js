import Repository from "./Repository";


export default {
    async getItemShopping(id) {
        const response = await Repository.get(`/payment-methoud-full-trans/${id}`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async getAllItemsPayment(page, limit, filters = {}) {
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&title=' + filters.searchQuery : '';
        let filterQuery = searchQuery;
        const response = await Repository.get(`/payment-methouds?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async updateItemShopping(id, data) {
        try {
            const response = await Repository.put(`/payment-methoud/${id}`, data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response;
        }
    },
    async deleteItemShopping(id) {
        const response = await Repository.delete(`/payment-methoud/${id}`);
        if (response.data) {
            return response.data;
        }
    },
    async newItemShopping(data) {
        try {
            const response = await Repository.post(`/payment-methouds`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
    // Shipping
    async getItemShipping(id) {
        const response = await Repository.get(`/shipping-methoud-full-trans/${id}`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async getAllItemsShipping(page, limit, filters = {}) {
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&title=' + filters.searchQuery : '';
        let filterQuery = searchQuery;
        const response = await Repository.get(`/shipping-methouds?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async updateItemShipping(id, data) {
        try {
            const response = await Repository.put(`/shipping-methoud/${id}`, data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response;
        }
    },
    async deleteItemShipping(id) {
        const response = await Repository.delete(`/shipping-methoud/${id}`);
        if (response.data) {
            return response.data;
        }
    },
    async newItemShipping(data) {
        try {
            const response = await Repository.post(`/shipping-methouds`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

};