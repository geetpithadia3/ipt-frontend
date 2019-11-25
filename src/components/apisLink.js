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
    },
    getSkillsCountUrl() {
        return this.getBaseUrl() + '/api/dashboard/get_skills_required_count';
    },
    getOpenPositionCountUrl() {
        return this.getBaseUrl() + '/api/dashboard/get_open_position_count';
    },
    getSkillsCompaniesCountUrl() {
        return this.getBaseUrl() + '/api/dashboard/get_skills_companies_count';
    },
    getRelevantJobPostings(){
        return this.getBaseUrl() + '/api/dashboard/get_relevant_job_postings';
    },
    getProgress(){
        return this.getBaseUrl() + '/api/activity/track';
    },
    getCurrentSkillsUrl() {
        return this.getBaseUrl() + '/api/dashboard/getskillslist'
    },
    updateUserSkillsUrl() {
        return this.getBaseUrl() + '/api/dashboard/updateskillslist'
    }
}