import axios from 'axios';

import qs from 'qs';

const url = "http://wb-predictivemaintenance-api.prsp7vkew2.eu-central-1.elasticbeanstalk.com/api/TorqueValues";


class ApiClient {
    async getAnaliticsData() {

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
