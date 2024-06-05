import { Button, CardBody } from "@windmill/react-ui";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { formatCurrency } from "../helpers/formatCurrency";

const Job = ({ job }) => {

    return (
        <Link to={`/job-postings/${job.job_id}`}>
            <div className="group">
                <CardBody className="flex flex-col items-stretch mt-4">
                    <h2 className="title-font text-lg font-medium overflow-ellipsis whitespace-nowrap overflow-hidden">
                        {job.title}
                    </h2>
                    <p className="">Salary: {formatCurrency(job.salary)}</p>
                    <p className="">Location: {job.location}</p>
                    <p className="">Job Type: {job.type}</p>
                </CardBody>
            </div>
        </Link>
    );
};

export default Job;
