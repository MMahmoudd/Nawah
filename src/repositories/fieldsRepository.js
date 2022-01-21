import Repository from "./Repository";

const resource = "/fields";

export default {
    async getField(id) {
        const response = await Repository.get(`/field-full-trans/${id}`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async updateField(id, data) {
        // console.log('from repo ', data)
        try {
            const response = await Repository.put(`/field/${id}`, data);
            console.log('from repo ', response.data)
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response;
        }
    },
    async deleteField(id) {
        const response = await Repository.delete(`/field/${id}`);
        if (response.data) {
            return response.data;
        }
    },
    async getAllFields(page, limit, filters = {}) {
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&title=' + filters.searchQuery : '';
        let filterQuery = searchQuery;
        const response = await Repository.get(`${resource}?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
        if (response.data.status === 200) {
            return response.data.Fields;
        }
    },

    async newField(data) {
        try {
            const response = await Repository.post(`/fields`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
};