import axios from 'axios';

// import backendRouter from '../../../../common/backend-router';

import qs from 'qs';

class ApiClient {
    async getAnaliticsData(companyId, criteria) {
        const url = backendRouter.generate('api_shop_analytics_get_sales_report', {companyId: companyId, criteria});

        const responseAnaliticsData = await this.request('get', url);

        return responseAnaliticsData;
    }

    async request(method, url, data, params) {
        let response;

        try {
            response = await axios({
                method,
                url,
                data,
                params,
                paramsSerializer(params) {
                    return qs.stringify(params, {arrayFormat: 'brackets'})
                },
            });
        } catch (e) {
            throw e;
        }

        return response.data;
    }
}

export default new ApiClient();
