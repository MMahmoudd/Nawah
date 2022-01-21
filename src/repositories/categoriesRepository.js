import Repository from "./Repository";

const resource = "/list-categories";

export default {
    async getCategory(id) {
        const response = await Repository.get(`/category-full-trans/${id}`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async updateCategory(id, data) {
        try {
            const response = await Repository.put(`/category/${id}`, data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response;
        }
    },
    async deleteCategory(id) {
        const response = await Repository.delete(`/category/${id}`);
        if (response.data) {
            return response.data;
        }
    },
    async getAllCategories(page, limit, filters = {}, idCategory = null) {
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&title=' + filters.searchQuery : '';
        let filterQuery = searchQuery;
        let byIdCategory = idCategory ? '/' + idCategory : ''
        const response = await Repository.get(`${resource}${byIdCategory}?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
        if (response.data.status === 200) {
            return response.data.Categories;
        }
    },
    async getAllSubCategories(page, limit, filters = {}, idCategory = null) {
        const response = await Repository.get(`/group-main-categories`);
        if (response.data.status === 200) {
            return response.data.Categories;
        }
    },

    async newCategory(data) {
        try {
            const response = await Repository.post(`/categories`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
};