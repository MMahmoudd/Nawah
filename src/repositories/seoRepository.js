import Repository from "./Repository";
export default {
    async getAllArKeywords(page, limit, filters = {}) {
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&title=' + filters.searchQuery : '';
        let filterQuery = searchQuery;
        const response = await Repository.get(`/metaKeys?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async newKeywords(data) {
        console.log(data)
        try {
            const response = await Repository.post(`/metaKeys`, data)
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
}