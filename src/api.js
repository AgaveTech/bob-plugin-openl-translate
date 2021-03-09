class Api {
    constructor(apikey, service) {
        this.apikey = apikey;
        this.service = service;
    }
    get baseUrl() {
        return 'https://api.openl.club'
    }
    async request(requestObject) {
        try {
            const body = Object.assign(Object.assign({}, requestObject.body), { apikey: this.apikey });
            const url = `${this.baseUrl}/services/${this.service}${requestObject.url}`;
            return await $http.request(Object.assign(Object.assign({}, requestObject), {
                url, header: {
                    'Content-Type': 'application/json',
                    'User-Agent': `openl-bob-plugin-v${$info.version}`,
                }, body
            }));
        }
        catch (e) {
            Object.assign(e, {
                _type: 'network',
                _message: '接口请求错误 - ' + e.message,
            });
            throw e;
        }
    }
}

exports.Api = Api;
