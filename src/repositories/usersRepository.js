import Repository from "./Repository";

const resource = "/user";
const groupResource = "/roles"
const updateResource = "/user-roles"
export default {
    getUser(id) {
        return Repository.get(`${resource}/${id}`).then((response) => {
            if (response.data.success) {
                return response.data.data;
            }
        })
    },
    // Get User Data
    getMyProfile() {
        return Repository.get(`/user`).then((response) => {
            console.log('userData',response)
            if (response.data.status === 200) {
                return response.data.user;
            }
        })
    },
    async updateUser(id, data) {
        console.log(id, data)
        const response = await Repository.put(`/user`, data, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        console.log(response)
            return response.data;
    },
    
    async getAllItems(page, limit, filters = {}) {
        console.log('filters', filters)

        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&title=' + filters.searchQuery : '';
        let filterQuery = searchQuery;
        let userType = (filters.userType && filters.userType !== '') ? '&type=' + filters.userType : '&type=user';
        const response = await Repository.get(`/users?page=${page}&limit=${limit}${filterQuery}&orderby=createdAt&order=desc${userType}`);
        if (response.data.status === 200) {
            return response.data;
        }

    },
    async getAllAdmins(page, limit, filters = {}) {
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&title=' + filters.searchQuery : '';
        let filterQuery = searchQuery;
        let userType = (filters.userType && filters.userType !== '') ? '&type=' + filters.userType : '&type=admin';
        const response = await Repository.get(`/users?page=${page}&limit=${limit}${filterQuery}&orderby=createdAt&order=desc${userType}`);
        console.log('response', response)
        if (response.data.status === 200) {
            console.log(response)
            return response.data;
        }

    },
    getAdmin(id) {
        return Repository.get(`${resource}/${id}`)
        .then((response) => {
                console.log('text', response.data.user)
                return response.data.user;
            
        })
    },

    async getAllGroups(page, limit) {
        const response = await Repository.get(`${groupResource}?page=${page}&limit=${limit}&sort_field=_id&sort_type=desc`);
        if (response.data.status === 200) {
            console.log(response)
            return response.data.Roles;
        }
    },
    
    updateUserRole(id, data) {
        return Repository.put(`${updateResource}`,{"user_id":id, "roles":data})
        
        .then((response) => {
            if (response.data.success) {
                return response.data;
            }
        }).catch(error => {
            return error.response.data.errors;
        })
    },
    deleteUser(id) {
        return Repository.delete(`${resource}/${id}`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        }).catch(error => {
            return error.response.data.errors;
        })
    },
    deleteUsers(ids) {
        return Repository.patch(`${resource}/?operation=delete&ids=${ids}`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        }).catch(error => {
            return error.response.data.errors;
        })
    },
    updateUsers(ids) {
        return Repository.patch(`${resource}/?operation=update&ids=${ids}&data[status]=0`).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        }).catch(error => {
            return error.response.data.errors;
        })
    },

    getAllUsers(page, limit, filters = {}) {

        let groupQuery = (filters.group && filters.group !== '') ? '&role=' + filters.group : '';
        let statusQuery = (filters.status && filters.status !== '') ? '&status=' + filters.status : '';

        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&q=' + filters.searchQuery : '';
        let filterQuery = groupQuery + searchQuery + statusQuery;

        return Repository.get(`${resource}?page=${page}&limit=${limit}${filterQuery}&sort_field=_id&sort_type=desc`).then((response) => {
            if (response.data.success) {
                return response.data.data;
            }
        });
    },
    newUser(data) { 
        return Repository.post(`${resource}`, data).then((response) => {
            if (response.data.success) {
                return response.data;
            }
        }).catch(error => {
            return error.response.data.errors;
        })
    },
    addUser(data) {
        return Repository.post(`/auth/signup`, data)
        .then((response) => {
            console.log(response.data)
                return response.data;
        })
    },
};
