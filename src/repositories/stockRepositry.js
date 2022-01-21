import Repository from "./Repository";

// const resource = "/stocks";
export default {
    async getAllItems() {
        const response = await Repository.get(`/stocks`);
        if (response.data.status === 200) {
            return response.data;
        }

    },
    async newStock(data) {
        const response = await Repository.post(`/stocks`, data);
        if (response.data.status === 200) {
            return response.data;
        }

    },
    async getOneStock(id) {
        const response = await Repository.get(`/stock/${id}`);
        if (response.data.status === 200) {
            return response.data;
        }

    },
    async updateStock(id, data) {
        const response = await Repository.put(`/stock/${id}`, data);
        if (response.data.status === 200) {
            console.log(response)
            return response.data;
        }
    },
    async deleteStock(id) {
        const response = await Repository.delete(`/stock/${id}`);
        if (response.data.status === 200) {
            console.log(response)
            return response.data;
        }
    },
    async getAllStockData(id, filters = {}) {
        console.log(filters)
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&bill_number=' + filters.searchQuery : '';
        let filterQuery = searchQuery;
        const response = await Repository.get(`/get-stock-data/${id}?${filterQuery}`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async updateStockData(id, data) {
        const response = await Repository.put(`/stock-data/${id}`, data);
        if (response.data.status === 200) {
            console.log(response)
            return response.data;
        }
    },
    async addStockData(id, data) {
        const response = await Repository.post(`/stock-data/${id}`, data);
        // if (response.data.status === 200) {
            return response.data;
        // }

    },

}