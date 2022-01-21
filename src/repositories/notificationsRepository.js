import Repository from "./Repository";

const resource = "/user-notifications";

export default {
    async getItem(id) {
        const response = await Repository.get(`/store-full-trans/${id}`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async updateItem(id, data) {
        try {
            const response = await Repository.put(`/store/${id}`, data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response;
        }
    },
    async deleteItem(id) {
        const response = await Repository.delete(`/store/${id}`);
        if (response.data) {
            return response.data;
        }
    },
    

    async getAllItems(page, limit, filters = {}) {

        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&title=' + filters.searchQuery : '';
        let filterQuery = searchQuery;
        const response = await Repository.get(`/list-notifications?page=${page}&limit=${limit}${filterQuery}&orderby=createdAt&order=desc`);
        if (response.data.status === 200) {
            return response.data;
        }

    },

    
    async addUserNotification(data, id) {
        try {
            const response = await Repository.post(`/add-users-notification/${id}?lang=ar`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
    async addUserCustomNotification(data) {
        try {
            const response = await Repository.post(`/add-custom-notification`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
    async fetchAllItemsHistory(page, limit, filters = {}) {

        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&title=' + filters.searchQuery : '';
        let filterQuery = searchQuery;
        const response = await Repository.get(`/user-notifications?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
        if (response.data.status === 200) {
            return response.data;
        }

    },

    async newItem(data) {
        try {
            const response = await Repository.post(`/add-notification`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
};