const pool = require("../config");
const { ErrorHandler } = require("../helpers/error");

const getAllApplicationsDb = async ({ limit, offset }) => {
    const { rows: application } = await pool.query(
        `select * from applications limit $1 offset $2`,
        [limit, offset]
    );
    return application;
};

const getApplicationByIdDb = async (id) => {
    const { rows: applications } = await pool.query(
        `select * from applications where application_id = $1`,
        [id]
    );
    return applications[0];
};

const getUserApplicationDetailsDb = async (id) => {
    const { rows: applications } = await pool.query(
        'SELECT j.title AS job_title, j.company AS job_company, j.location AS job_location, u.fullname AS employer, j.salary AS job_salary, j.job_type AS job_type, a.status, a.created_at AS applied_date, j.job_id FROM  public.applications a JOIN  public.job_postings j ON a.job_id = j.job_id JOIN  public.users u ON j.employer_id = u.user_id WHERE  a.seeker_id = $1;',
        [id]
    );
    return applications;
}

const getEmployerApplicationsDb = async (id) => {
    const { rows: applications } = await pool.query(
        `SELECT a.application_id, a.job_id, jp.title AS job_title, a.seeker_id, u.username AS seeker_username, a.resume, a.cover_letter, a.status, a.created_at AS application_created_at FROM applications a JOIN job_postings jp ON a.job_id = jp.job_id JOIN users u ON a.seeker_id = u.user_id WHERE jp.employer_id = $1;
        `,
        [id]
    )
    return applications;
}

const createApplicationDb = async ({ job_id, seeker_id, resume, cover_letter }) => {
    try {
        const { rows: applications } = await pool.query(
            `INSERT INTO applications(job_id, seeker_id, resume, cover_letter) VALUES($1, $2, $3, $4) returning *`,
            [job_id, seeker_id, resume, cover_letter]
        );
        return applications[0];
    } catch (error) {
        throw new ErrorHandler(403, "Unique key constraint violation.");
    }
};

const updateApplicationDb = async ({ resume, cover_letter, status, id }) => {
    // TODO: seeker cant change status and can only update his own applicaiton
    const { rows: applications } = await pool.query(
        `UPDATE applications set resume = $1, cover_letter = $2, status = $3 
        where application_id = $4 returning resume, cover_letter, status`,
        [resume, cover_letter, status, id]
    );
    return applications[0];
};

const deleteApplicationDb = async (id) => {
    const { rows: applications } = await pool.query(
        `DELETE FROM applications where application_id = $1 returning *`,
        [id]
    );
    return applications[0];
};

module.exports = {
    getAllApplicationsDb,
    getApplicationByIdDb,
    getUserApplicationDetailsDb,
    getEmployerApplicationsDb,
    createApplicationDb,
    updateApplicationDb,
    deleteApplicationDb,
};