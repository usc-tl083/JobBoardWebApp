import { Card } from "@windmill/react-ui";
import Job from "components/Job";
import API from "api/axios.config";
import { useUser } from "context/UserContext";
import Layout from "layout/Layout";
import { useEffect, useState } from "react";

const PostedJobs = () => {
    const { userData } = useUser();
    const [jobPost, setJobPost] = useState([]);

    const getPostedJobs = async () => {
        await API.get("/job-postings/get-posted-jobs")
            .then(response => {
                setJobPost(response.data);
            })
    };

    useEffect(() => {
        getPostedJobs();
    }, []);

    console.log(jobPost);

    if (userData?.roles?.includes("employer")) {
        return (
            <Layout>
                <h1 className="mt-4 text-center text-4xl font-semibold">Job Posts</h1>
                <div className="container py-20 mx-auto space-y-2">
                    <Card className="flex flex-wrap h-full mx-2 border-2">
                        {jobPost?.map((job_post) => (
                            <div
                                className="w-full flex flex-col justify-between sm:w-1/2 md:w-1/3 lg:w-1/4 my-2 px-2 box-border"
                                key={job_post.job_id}
                            >
                                <Job job={job_post} />
                            </div>
                        ))}
                    </Card>
                </div>
            </Layout>
        );
    } else {
        return (
            <Layout>
                <h1>No Job Posts</h1>
            </Layout>
        );
    };
};

export default PostedJobs;
