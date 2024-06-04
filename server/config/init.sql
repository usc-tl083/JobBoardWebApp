CREATE TABLE public."resetTokens"
(
    id SERIAL NOT NULL,
    email character varying NOT NULL,
    token character varying NOT NULL,
    used boolean DEFAULT false NOT NULL,
    expiration timestamp without time zone,
    PRIMARY KEY (id)
);

CREATE TABLE public.users
(
    user_id SERIAL NOT NULL,
    username character varying(50) UNIQUE NOT NULL,
    email character varying(100) UNIQUE NOT NULL,
    password character varying(200),
    fullname character varying(100) NOT NULL,
    roles character varying(10)[] DEFAULT '{seeker}'::character varying[] NOT NULL,
    address character varying(200),
    city character varying(100),
    state character varying(100),
    country character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);

CREATE TABLE public.job_postings
(
    job_id SERIAL NOT NULL,
    employer_id integer NOT NULL,
    title character varying(100) NOT NULL,
    description text NOT NULL,
    requirements text NOT NULL,
    salary real,
    location character varying(100) NOT NULL,
    job_type character varying(50) NOT NULL CHECK (job_type IN ('full-time', 'part-time', 'freelance')),
    application_deadline date NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (job_id),
    FOREIGN KEY (employer_id) REFERENCES public.users (user_id) ON DELETE CASCADE
);