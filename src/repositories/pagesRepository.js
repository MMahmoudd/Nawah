import Repository from "./Repository";

const resource = "/page";

export default {
    // Contact Us
    async getContactUs(lang) {
        let language = lang? '?lang='+lang : ''
        const response = await Repository.get('/contactus'+ language);
            return response.data.contactus;
    },
    async updateContactUs(data) {
        try {
            const response = await Repository.put('/contactus', data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response.data.errors;
        }
    },
    // About Us
    async getAboutUs(lang) {
        let language = lang? '?lang='+lang : ''
        const response = await Repository.get('/aboutus'+ language);
            return response.data.aboutus;
    },
    async updateAboutUs(data) {
        try {
            const response = await Repository.put('/aboutus', data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response.data.errors;
        }
    },
    // Policy
    async getPolicy(lang) {
        let language = lang? '?lang='+lang : ''
        const response = await Repository.get('/policy'+ language);
            return response.data.policy;
    },
    async updatePolicy(data) {
        try {
            const response = await Repository.put('/policy', data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response.data.errors;
        }
    },
    // Keywords
    async getKeywords(lang) {
        let language = lang? '?lang='+lang : ''
        const response = await Repository.get('/metaKeys'+ language);
        return response.data.metaKeys.metaKayes;
    },
    async updateKeywords(data) {
        try {
            const response = await Repository.put('/metaKeys', data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response.data.errors;
        }
    },
    // Refund Policy
    async getRefundPolicy(lang) {
        let language = lang? '?lang='+lang : ''
        const response = await Repository.get('/refundPolicy'+ language);
            return response.data.policy;
    },
    async updateRefundPolicy(data) {
        try {
            const response = await Repository.put('/refundPolicy', data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response.data.errors;
        }
    },
    // Terms And Condition
    async getTerms(lang) {
        let language = lang? '?lang='+lang : ''
        const response = await Repository.get('/termsAndCondition'+ language);
            return response.data.termsAndCondition;
    },
    async updateTerms(data) {
        try {
            const response = await Repository.put('/termsAndCondition', data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response.data.errors;
        }
    },
    // Splash
    async getSplash(lang) {
        let language = lang? '?lang='+lang : ''
        const response = await Repository.get('/splash'+ language);
            return response.data.splash;
    },
    async updateSplash(data) {
        try {
            const response = await Repository.put('/splash', data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response.data.errors;
        }
    },
    // Shipping Policy
    async getShippingPolicy(lang) {
        let language = lang? '?lang='+lang : ''
        const response = await Repository.get('/shippingPolicy'+ language);
            return response.data.shippingPolicy;
    },
    async updateShippingPolicy(data) {
        try {
            const response = await Repository.put('/shippingPolicy', data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response.data.errors;
        }
    },
    // Payment Policy
    async getPaymentPolicy(lang) {
        let language = lang? '?lang='+lang : ''
        const response = await Repository.get('/paymentPolicy'+ language);
            return response.data.paymentPolicy;
    },
    async updatePaymentPolicy(data) {
        try {
            const response = await Repository.put('/paymentPolicy', data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response.data.errors;
        }
    },
    // Gift Carts
    async getGiftCarts(lang) {
        let language = lang? '?lang='+lang : ''
        const response = await Repository.get('/giftCarts'+ language);
            return response.data.giftCarts;
    },
    async updateGiftCarts(data) {
        try {
            const response = await Repository.put('/giftCarts', data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response.data.errors;
        }
    },
    // Gift Carts
    async getSocial(lang) {
        let language = lang? '?lang='+lang : ''
        const response = await Repository.get('/social'+ language);
            return response.data.social;
    },
    async updateSocial(data) {
        try {
            const response = await Repository.put('/social', data);
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            return error.response.data.errors;
        }
    },
    
    async getAllContacts(page, limit, filters = {}) {
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&title=' + filters.searchQuery : '';
        let filterQuery = searchQuery;
        const response = await Repository.get(`/contact-us?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
        if (response.data.status === 200) {
            return response.data.contact_us;
        }
    },
    async getAllSubscribe(page, limit, filters = {}) {
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&title=' + filters.searchQuery : '';
        let filterQuery = searchQuery;
        const response = await Repository.get(`/subscribe-us?page=${page}&limit=${limit}${filterQuery}&orderby=id&order=desc`);
        if (response.data.status === 200) {
            return response.data.subscribe_us;
        }
    },


    
    async deleteImage(key, lang) {
        const response = await Repository.delete(`aboutus/?key=${key}&lang=${lang}`);
        if (response.data.success) {
            return response.data;
        }
    },
    async deletePage(id) {
        const response = await Repository.delete(`${resource}/${id}`);
        if (response.data.success) {
            return response.data;
        }
    },
    async deletePages(ids) {
        const response = await Repository.patch(`${resource}/?operation=delete&ids=${ids}`);
        if (response.data.success) {
            return response.data;
        }
    },
    async getAllPages(page, limit, filters = {}) {
        let statusQuery = (filters.status && filters.status !== '') ? '&status=' + filters.status : '';
        let searchQuery = (filters.searchQuery && filters.searchQuery !== '') ? '&q=' + filters.searchQuery : '';
        let orderQuery = filters.order ? "&sort_type=" + filters.order : "";

        let filterQuery = searchQuery + statusQuery + orderQuery
        const response = await Repository.get(`${resource}?page=${page}&limit=${limit}${filterQuery}&sort_field=_id`);
        if (response.data.success) {
            return response.data;
        }
    },
    async newPage(data) {
        try {
            const response = await Repository.post(`${resource}`, data);
            if (response.data.success) {
                return response.data;
            }
        } catch (error) {
            return error.response.data.errors;
        }
    },
};
