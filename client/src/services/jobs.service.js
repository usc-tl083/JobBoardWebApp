import API from "api/axios.config";

class JobService {
    getJobs(page) {
        return API.get(`/job-postings/?page=${page}`);
    }
    getJob(id) {
        return API.get(`/job-postings/${id}`);
    }
}

export default new JobService();