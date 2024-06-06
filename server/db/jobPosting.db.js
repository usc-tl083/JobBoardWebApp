const pool = require("../config");

const getAllJobPostingsDb = async ({ limit, offset }) => {
    const { rows: job_postings } = await pool.query(
        "select * from job_postings limit $1 offset $2",
        [limit, offset]
    );
    return job_postings;
};

const createJobPostingDb = async ({ employer_id, title, description, requirements, salary, location, company, job_type, application_deadline }) => {
    const { rows: job_posting } = await pool.query(
        "INSERT INTO job_postings(employer_id, title, description, requirements, salary, location, company, job_type, application_deadline) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *",
        [employer_id, title, description, requirements, salary, location, company, job_type, application_deadline]
    );
    return job_posting[0];
};

const getJobPostingByIdDb = async (id) => {
    const { rows: job_postings } = await pool.query(
        "select * from job_postings where job_id = $1",
        [id]
    );
    return job_postings[0];
};

const getJobPostingByEmployerIdDb = async (id) => {
    const { rows: job_postings } = await pool.query(
        "select * from job_postings where employer_id = $1",
        [id]
    );
    return job_postings;
};

const getJobPostingsByTitleDb = async (title) => {
    const { rows: job_postings } = await pool.query(
        "select * from job_postings where lower(title) = lower($1)",
        [title]
    );
    return job_postings;
};

const getJobPostingsByJobTypeDb = async (type) => {
    const { rows: job_postings } = await pool.query(
        "select * from job_postings where lower(job_type) = lower($1)",
        [type]
    );
    return job_postings;
};

const getJobPostingsByLocationDb = async (location) => {
    const { rows: job_postings } = await pool.query(
        "select * from job_postings where lower(location) = lower($1)",
        [location]
    );
    return job_postings;
};

const updateJobPostingDb = async ({
    title,
    description,
    requirements,
    salary,
    location,
    company,
    job_type,
    application_deadline,
    id,
}) => {
    const { rows: job_postings } = await pool.query(
        `UPDATE job_postings set title = $1, description = $2, requirements = $3, salary = $4, location = $5, company = $6, job_type = $7, application_deadline = $8 
        where job_id = $9 returning title, description, requirements, salary, location, company, job_type, application_deadline, job_id`,
        [title, description, requirements, salary, location, company, job_type, application_deadline, id]
    );
    return job_postings[0];
};

const deleteJobPostingDb = async (id) => {
    const { rows: job_postings } = await pool.query(
        "DELETE FROM job_postings where job_id = $1 returning *",
        [id]
    );
    return job_postings[0];
};

module.exports = {
    getAllJobPostingsDb,
    createJobPostingDb,
    getJobPostingByIdDb,
    getJobPostingByEmployerIdDb,
    getJobPostingsByTitleDb,
    getJobPostingsByJobTypeDb,
    getJobPostingsByLocationDb,
    updateJobPostingDb,
    deleteJobPostingDb,
};