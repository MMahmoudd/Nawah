import Repository from "./Repository";

const productResource = "/products";
// const usersResource = "/users";
const ordersResource = "/list-orders";

export default {

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
        let exportExcel = ''
            if(filters.exportExcel){
                exportExcel = filters.exportExcel
            };
        let filterQuery = searchQuery + filterCategory + filterfeatured + filterdiscount + exportExcel;
        let byIdCategory = idCategory ? '/' + idCategory : ''
        const response = await Repository.get(`${productResource}${byIdCategory}?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
        console.log(response)
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async getFiles(page, limit, filters = {}, idCategory = null) {
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
        let exportExcel = '&exportExcel=true'
        let filterQuery = searchQuery + filterCategory + filterfeatured + filterdiscount + exportExcel;
        let byIdCategory = idCategory ? '/' + idCategory : ''
        const response = await Repository.get(`${productResource}${byIdCategory}?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
        console.log(response)    
        return response.data
    },

    async getAllUsers(page, limit, filters = {}) {
        console.log(filters)
        let searchQueryByEmail = (filters.searchQuery && filters.searchQuery !== '') ? '&email=' + filters.searchQuery : ''  ;
        let searchQueryByPhone = (filters.searchQueryByPhone && filters.searchQueryByPhone !== '') ? '&phone=' + filters.searchQueryByPhone : ''  ;
        let birthDate = (filters.birthDate && filters.birthDate !== '') ? '&birthDate=' + filters.birthDate : ''  ;
        let gender = (filters.gender && filters.gender !== '') ? '&gender=' + filters.gender : '' ;
        let filterQuery = searchQueryByEmail + searchQueryByPhone + gender + birthDate;
        let userType = (filters.userType && filters.userType !== '') ? '&type=' + filters.userType : '&type=user';
        const response = await Repository.get(`/users?page=${page}&limit=${limit}${filterQuery}&orderby=createdAt&order=desc${userType}`); 
        if (response.data.status === 200) {
            return response.data;
        }

    },
    async getUsersFile(filters = {}) {
        let searchQueryByEmail = (filters.searchQuery && filters.searchQuery !== '') ? '&email=' + filters.searchQuery : ''  ;
        let searchQueryByPhone = (filters.searchQueryByPhone && filters.searchQueryByPhone !== '') ? '&phone=' + filters.searchQueryByPhone : ''  ;
        let birthDate = (filters.birthDate && filters.birthDate !== '') ? '&birthDate=' + filters.birthDate : '';
        let gender = (filters.gender && filters.gender !== '') ? '&gender=' + filters.gender : '';
        let exportExcel = '&exportExcel=true'
        let filterQuery = searchQueryByEmail + searchQueryByPhone + gender + birthDate + exportExcel;
        let userType = (filters.userType && filters.userType !== '') ? '&type=' + filters.userType : '&type=user';
        const response = await Repository.get(`/users?${filterQuery}&orderby=createdAt&order=desc${userType}`);
        console.log('getUsersFile',response)
        if (response.data.status === 200) {
            return response.data;
        }

    },

    async getAllOrders(page, limit, filters = {}, idCategory = null) {
        console.log(filters)

        let searchQuery = (filters.searchQuery && filters.searchQuery == '') ? '&orderby=' + filters.searchQuery : '';
        let filterStatus = (filters.status && filters.status !== '') ? '&status=' + filters.status : '';
        let filterQuery = searchQuery + filterStatus;
        let byIdCategory = idCategory ? '/' + idCategory : ''
        const response = await Repository.get(`${ordersResource}${byIdCategory}?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async getOrdersFile(page, limit, filters = {}, idCategory = null) {
        let searchQuery = (filters.searchQuery && filters.searchQuery == '') ? '&orderby=' + filters.searchQuery : '';
        let filterStatus = (filters.status && filters.status !== '') ? '&status=' + filters.status : '';
        let exportExcel = '&exportExcel=true'
        let filterQuery = searchQuery + filterStatus + exportExcel;
        let byIdCategory = idCategory ? '/' + idCategory : ''
        const response = await Repository.get(`${ordersResource}${byIdCategory}?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
        if (response.data.status === 200) {
            return response.data;
        }
    },
};