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
    createApplicationDb,
    updateApplicationDb,
    deleteApplicationDb,
};