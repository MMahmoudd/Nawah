import Repository from "./Repository";

const resource = "/roles";

export default {
   
    async getGroup(id) {
        const response = await Repository.get(`/role/${id}`);
        if (response.data.status === 200) {
            console.log(response)
            return response.data.Role;
        }
    },
    
    async updateGroup(id, data) {
        try {
            const response = await Repository.put(`/role/${id}`, data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response;
        }
    },
    
    async deleteGroup(id) {
        const response = await Repository.delete(`/role/${id}`);
        if (response.data) {
            return response.data;
        }
    },
    async getAllGroups(page, limit, filters = {}) {
        let groupQuery = (filters.group && filters.group !== '') ? '&role=' + filters.group : '';
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&q=' + filters.searchQuery : '';
        let filterQuery = groupQuery + searchQuery;

        const response = await Repository.get(`${resource}?page=${page}&limit=${limit}${filterQuery}&sort_field=_id&sort_type=desc`);
        if (response.data.status === 200) {
            console.log(response)
            return response.data.Roles;
        }
    },
    async getAllPrivileges() {
        const response = await Repository.get(`/privileges`);
        if (response.data.status === 200) {
            return response.data.privileges;
        }
    },
    async newGroup(data) {
        try {
            const response = await Repository.post(`/roles`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },
};
