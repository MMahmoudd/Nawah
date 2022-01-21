import Repository from "./Repository";

const resource = "/fields";

export default {
    async getSlider(id) {
        const response = await Repository.get(`/slider-full-trans/${id}`);
        if (response.data.status === 200) {
            return response.data.Slider;
        }
    },
    async updateSlider(id, data) {
        try {
            const response = await Repository.put(`/slider/${id}`, data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response;
        }
    },
    
    async deleteSlider(id) {
        const response = await Repository.delete(`/slider/${id}`);
        if (response.data) {
            return response.data;
        }
    },
    async getAllSliders(page, limit, filters = {}) {
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&title=' + filters.searchQuery : '';
        let filterQuery = searchQuery;
        const response = await Repository.get(`/sliders?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
        if (response.data.status === 200) {
            return response.data.Sliders;
        }
    },

    async newSlider(data) {
        try {
            const response = await Repository.post(`/sliders`, data);
            return response.data;
        } catch (error) {
            return error.response;
        }
    },

    async getChooseUs(lang) {
        let language = lang? '?lang='+lang : ''
        const response = await Repository.get('/chooseUs'+ language);
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async updateChooseUs(data) {
        try {
            const response = await Repository.put(`/chooseUs`, data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response;
        }
    },
    async getPreferences() {
        const response = await Repository.get('/preferences');
        if (response.data.status === 200) {
            return response.data;
        }
    },
    async updatePreferences(data) {
        try {
            const response = await Repository.put(`/preferences`, data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response;
        }
    },
};