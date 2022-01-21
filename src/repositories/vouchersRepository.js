import Repository from "./Repository";

const resource = "/vouchers";

export default {
    async getVoucher(id) {
        const response = await Repository.get(`/voucher-full-trans/${id}`);
        console.log(response)
        if (response.data.status === 200) {
            return response.data.Voucher;
        }
    },
    async updateVoucher(id, data) {
        try {
            const response = await Repository.put(`/voucher/${id}`, data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response;
        }
    },
    async deleteVoucher(id) {
        const response = await Repository.delete(`/voucher/${id}`);
        if (response.data) {
            return response.data;
        }
    },
    async getAllVouchers(page, limit, filters = {}) {
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&title=' + filters.searchQuery : '';
        let filterQuery = searchQuery;
        const response = await Repository.get(`${resource}?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
        if (response.data.status === 200) {
            return response.data.Vouchers;
        }
    },

    async newVoucher(data) {
        try {
            const response = await Repository.post(`/vouchers`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async setVoucherCategories(id, data) {
        try {
            const response = await Repository.post(`/voucher-categories/${id}`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
    async getVoucherCategories(id) {
        const response = await Repository.get(`/voucher-categories/${id}`);
        if (response.data.status === 200) {
            return response.data.Categories;
        }
    },
    async setVoucherProducts(id, data) {
        try {
            const response = await Repository.post(`/voucher-products/${id}`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
    async getVoucherProducts(id) {
        const response = await Repository.get(`/voucher-products/${id}`);
        if (response.data.status === 200) {
            return response.data.Products;
        }
    },
    async setVoucherUsers(id, data) {
        try {
            const response = await Repository.post(`/voucher-users/${id}`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
    async getVoucherUsers(id) {
        const response = await Repository.get(`/voucher-users/${id}`);
        if (response.data.status === 200) {
            return response.data.Users;
        }
    },

    


};