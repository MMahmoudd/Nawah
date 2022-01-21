import Repository from "./Repository";

const resource = "/list-orders";

export default {
    async getItem(id) {
        const response = await Repository.get(`/order/${id}`);
        if (response.data.status === 200) {
            return response.data;
        }
    },

    async getAllItems(page, limit, filters = {}, idCategory = null) {

        let searchQuery = (filters.searchQuery && filters.searchQuery == '') ? '&orderby=' + filters.searchQuery : '';
        let filterStatus = (filters.status && filters.status !== '') ? '&status=' + filters.status : '';
        let filterQuery = searchQuery + filterStatus;
        let byIdCategory = idCategory ? '/' + idCategory : ''
        const response = await Repository.get(`${resource}${byIdCategory}?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
        if (response.data.status === 200) {
            return response.data;
        }

    },

    async getAllStatus() {
        const response = await Repository.get(`/delivery-options`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async getStatus(id) {
        console.log(id)
        const response = await Repository.get(`/delivery-option-full-trans/${id}/?page=1&limit=20&order=DESC&orderby=id`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async updateOrder(id, data) {
        const response = await Repository.put(`/order/${id}`,{
            'delivery_id': data
        });
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async updateStatus(id, data) {
        console.log(id, data)
        const response = await Repository.put(`/delivery-option/${id}`, data);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async addStatus(data) {
        const response = await Repository.post(`/delivery-options`, data);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async deleteStatus(id) {
        const response = await Repository.delete(`/delivery-option/${id}`,);
        if (response.data.status === 200) {
            return response.data;
        }
    }

};