import Repository from "./Repository";

const resource = "/main-geographies";

export default {
    async getItem(id) {
        const response = await Repository.get(`/geography-full-trans/${id}`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async updateItem(id, data) {
        try {
            const response = await Repository.put(`/geography/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response;
        }
    },
    async deleteItem(id) {
        const response = await Repository.delete(`/geography/${id}`);
        if (response.data) {
            return response.data;
        }
    },
    

    async getAllItems(page, limit, filters = {}, idCategory = null) {

        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&title=' + filters.searchQuery : '';
        let filterQuery = searchQuery;
        let byIdCategory = idCategory ? '/' + idCategory : ''
        if(idCategory){
            const response = await Repository.get(`/sub-geographies?geography_id=${idCategory}`);
            if (response.data.status === 200) {
                return response.data;
            }
        } else {
            const response = await Repository.get(`${resource}${byIdCategory}?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
            if (response.data.status === 200) {
                return response.data;
            }
        }
        

    },

    async newItem(data) {
        try {
            const response = await Repository.post(`/geographies`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
};