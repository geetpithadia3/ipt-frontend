export const APILinks = {
    dev: true,
    getBaseUrl() {
        return this.dev ? 'http://localhost:5000' : '';
    },
    getLoginUrl() {
        return this.getBaseUrl() + '/api/user/';
    },
    fetchCompanyDetails() {
        return this.getBaseUrl() + '/api/company/get_company_details_list';
    },
    registerUserUrl() {
        return this.getBaseUrl() + '/api/user/add_user';
    }
}