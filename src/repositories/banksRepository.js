import Repository from "./Repository";

// const resource = "/stocks";
export default {
    async getAllItems() {
        const response = await Repository.get(`/banks`);
        if (response.data.status === 200) {
            return response.data;
        }

    },
    async newBank(data) {
        const response = await Repository.post(`/banks`, data);
        if (response.data.status === 200) {
            return response.data;
        }

    },
    async getOneBank(id) {
        const response = await Repository.get(`/bank-full-trans/${id}`);
        if (response.data.status === 200) {
            return response.data;
        }

    },
    async updateBank(id, data) {
        const response = await Repository.put(`/bank/${id}`, data);
        if (response.data.status === 200) {
            console.log(response)
            return response.data;
        }
    },
    async deleteStock(id) {
        const response = await Repository.delete(`/bank/${id}`);
        if (response.data.status === 200) {
            console.log(response)
            return response.data;
        }
    },
}