import Repository from "./Repository";

const resource = "/products";

export default {
    async getProduct(id) {
        const response = await Repository.get(`/product-full-trans/${id}`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async updateProduct(id, data) {
        try {
            const response = await Repository.put(`/product/${id}`, data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response;
        }
    },
    async deleteProduct(id) {
        const response = await Repository.delete(`/product/${id}`);
        if (response.data) {
            return response.data;
        }
    },
    async getAllProducts(page, limit, filters = {}, idCategory = null) {
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&name=' + filters.searchQuery : '';
        let filterCategory = (filters.category && filters.category !== '') ? '&category_id=' + filters.category : '';
        let filterfeatured = ''
        if(filters.featured){
            filterfeatured = '&featured=' + (filters.featured === 'featured' ? 1 : 0);
        }
        let filterdiscount = ''
        if(filters.discount){
            filterdiscount = filters.discount
        }
        let filterQuery = searchQuery + filterCategory + filterfeatured + filterdiscount;
        let byIdCategory = idCategory ? '/' + idCategory : ''
        const response = await Repository.get(`${resource}${byIdCategory}?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async getAllProductsForSkider() {
        const response = await Repository.get(`${resource}?page=1`);
        // console.log(response)
        if (response.data.status === 200) {
            return response.data;
        }
    },

    async deleteOption(id, data) {
        const response = await Repository.put(`/product-fields/${id}`, data);
        if (response.data) {
            return response.data;
        }
    },

    async newProduct(data) {
        try {
            const response = await Repository.post(`/products`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
    async newOptions(id, data) {
        try {
            const response = await Repository.post(`/product-fields/${id}`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
    async getProductPrices(id,) {
        try {
            const response = await Repository.get(`/product-prices/${id}`);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
    async updateProductPrices(id, data) {
        try {
            const response = await Repository.put(`/product-prices/${id}`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
    async addProductPrices(id, data) {
        try {
            const response = await Repository.post(`/product-prices/${id}`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
};