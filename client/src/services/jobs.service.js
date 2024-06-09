import API from "api/axios.config";

class JobService {
    getJobs(page) {
        return API.get(`/job-postings/?page=${page}`);
    }

    getJob(id) {
        return API.get(`/job-postings/${id}`);
    }

    getUserApplications() {
        return API.get("/job-postings/get-user-applications");
    }

    async applyJob(job_id, resume, cover_letter) {
        const { data } = await API.post("/job-postings/apply", {
            job_id,
            resume,
            cover_letter,
        });
        return data;
    }
};

export default new JobService();