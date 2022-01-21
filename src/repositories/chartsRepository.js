import Repository from "./Repository";

export default {
    // getChartData(category = null, type = 'months', duration = 7) {
    //     return Repository.get(`${category}/chart?period=${type}&duration=${duration}`).then((response) => {
    //         if (response.data.success) {
    //             return response.data.data;
    //         }
    //     });
    // },
    async getChartData() {
        const response = await Repository.get(`/dashboard-home`)
            // console.log('dashboard-home' ,response)
            if (response.data.status === 200) {
                return response.data;
            }
    },

};
