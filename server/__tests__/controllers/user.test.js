const bcrypt = require("bcrypt");
const pool = require("../../config");
const supertest = require("supertest");
const app = require("../../app");
const api = supertest(app);
const jwt = require("jsonwebtoken");
const { usersInDb } = require("../../helpers/test_helper");

let adminAuth = {};
let seekerAuth = {};

beforeEach(async () => {
    const hashedPassword = await bcrypt.hash("secret", 1);

    // admin account
    await pool.query(
        "INSERT INTO users(username, password, email, fullname, roles) VALUES($1, $2, $3, $4, $5) returning user_id",
        [
            "admin",
            hashedPassword,
            "admin@email.com",
            "admin",
            '{"seeker", "admin"}',
        ]
    );

    // seeker account
    await pool.query(
        "INSERT INTO users(username, password, email, fullname) VALUES($1, $2, $3, $4) returning user_id",
        ["jobseeker", hashedPassword, "seeker@email.com", "job seeker"]
    );

    const adminLogin = await api.post("/api/auth/login").send({
        email: "admin@email.com",
        password: "secret",
    });
    const seekerLogin = await api.post("/api/auth/login").send({
        email: "seeker@email.com",
        password: "secret",
    });

    // take the result of the POST /users/auth which is a JWT
    // store it in the auth object
    adminAuth.token = adminLogin.body.token;
    seekerAuth.token = seekerLogin.body.token;
    // store the id from the token in the auth object
    adminAuth.user_id = jwt.decode(adminAuth.token).id;
    seekerAuth.user_id = jwt.decode(seekerAuth.token).id;
});

// remove all the users
afterEach(async () => {
    await pool.query("DELETE FROM users");
});

describe("User controller", () => {
    describe("Add new user", () => {
        it("should create a new user if user is an admin", async () => {
            const usersAtStart = await usersInDb();
            const hashedPassword = await bcrypt.hash("secret", 1);
            const response = await api
                .post("/api/users")
                .send({
                    fullname: "John Doe",
                    password: hashedPassword,
                    username: "johnny",
                    email: "johndoe@email.com",
                    roles: '{"seeker"}',
                })
                .expect(201)
                .set("auth-token", adminAuth.token);

            const usersAtEnd = await api
                .get("/api/users")
                .set("auth-token", adminAuth.token);

            expect(response.body).toHaveProperty("status", "success");
            expect(response.body).toHaveProperty("user");
            expect(response.body.user).not.toHaveProperty("password");
            expect(usersAtEnd.body).toHaveLength(usersAtStart.length + 1);
        });

        it("should not create a new user if user is not an admin", async () => {
            const usersAtStart = await usersInDb();
            const response = await api
                .post("/api/users")
                .send({
                    fullname: "John Doe",
                    password: "hashedPassword",
                    username: "johnny",
                    email: "johndoe@email.com",
                    roles: '{"seeker"}',
                })
                .expect(401)
                .set("auth-token", seekerAuth.token);

            const usersAtEnd = await api
                .get("/api/users")
                .set("auth-token", adminAuth.token);

            expect(response.body).toHaveProperty("status", "error");
            expect(response.body).not.toHaveProperty("user");
            expect(response.body).toHaveProperty("message", "require admin role");
            expect(usersAtEnd.body).toHaveLength(usersAtStart.length);
        });
    });

    describe("Get user by id", () => {
        it("should return a user if user is an admin", async () => {
            const response = await api
                .get(`/api/users/${adminAuth.user_id}`)
                .expect(200)
                .set("auth-token", adminAuth.token);

            expect(response.body).toHaveProperty("username");
            expect(response.body).toHaveProperty("email");
            expect(response.body).not.toHaveProperty("password");
        });

        it("should return user if user is authorized", async () => {
            const response = await api
                .get(`/api/users/${seekerAuth.user_id}`)
                .expect(200)
                .set("auth-token", seekerAuth.token);

            expect(response.body).toHaveProperty("username");
            expect(response.body).toHaveProperty("email");
            expect(response.body).not.toHaveProperty("password");
        });

        it("should not return user if user is not an admin or authorized", async () => {
            await api.post("/api/auth/signup").send({
                email: "anotherSeeker@email.com",
                password: "secret",
                fullname: "test db",
                username: "test",
                roles: ["seeker"]
            });

            const anotherSeeker = await api.post("/api/auth/login").send({
                email: "anotherSeeker@email.com",
                password: "secret",
            });

            const response = await api
                .get(`/api/users/${seekerAuth.user_id}`)
                .expect(401)
                .set("auth-token", anotherSeeker.body.token);

            expect(response.body).toHaveProperty("status", "error");
            expect(response.body).not.toHaveProperty("user");
            expect(response.body).toHaveProperty("message", "Unauthorized");
        });
    });

    describe("Get all users", () => {
        it("should return all users in database if user is an admin", async () => {
            const initialUsers = await usersInDb();
            const response = await api
                .get("/api/users")
                .expect(200)
                .set("auth-token", adminAuth.token);

            expect(response.body).toHaveLength(initialUsers.length);
        });
        it("should not return all users in database if user is not an admin", async () => {
            const response = await api
                .get("/api/users")
                .expect(401)
                .set("auth-token", seekerAuth.token);

            expect(response.body).toHaveProperty("status", "error");
            expect(response.body).not.toHaveProperty("user");
            expect(response.body).toHaveProperty("message", "require admin role");
        });
    });

    describe("Update user", () => {
        it("should update a user if user is an admin", async () => {
            const usersAtStart = await usersInDb();
            const { user_id } = usersAtStart[1];

            const response = await api
                .put(`/api/users/${user_id}`)
                .set("auth-token", adminAuth.token)
                .send({
                    username: "newUsername",
                    email: "newEmail@email.com",
                    fullname: "new man",
                    address: "address here",
                    city: "city here",
                    state: "state here",
                    country: "Nepal",
                    id: seekerAuth.user_id,
                })
                .expect(200);
            expect(response.body).toHaveProperty("username", "newUsername");
            expect(response.body).toHaveProperty("email", "newEmail@email.com");
            expect(response.body).toHaveProperty("fullname", "new man");
            expect(response.body).toHaveProperty("address", "address here");
            expect(response.body).toHaveProperty("city", "city here");
            expect(response.body).toHaveProperty("state", "state here");
            expect(response.body).toHaveProperty("country", "Nepal");
        });

        it("should update a user if user is authorized", async () => {
            const usersAtStart = await usersInDb();
            const { user_id } = usersAtStart[1];

            const response = await api
                .put(`/api/users/${user_id}`)
                .set("auth-token", adminAuth.token)
                .send({
                    username: "newcustUsername",
                    email: "newcustEmail@email.com",
                    fullname: "new man",
                    address: "address here",
                    city: "city here",
                    state: "state here",
                    country: "Nepal",
                    id: seekerAuth.user_id,
                })
                .expect(200);

            expect(response.body).toHaveProperty("username", "newcustUsername");
            expect(response.body).toHaveProperty("email", "newcustEmail@email.com");
            expect(response.body).toHaveProperty("fullname", "new man");
            expect(response.body).toHaveProperty("address", "address here");
            expect(response.body).toHaveProperty("city", "city here");
            expect(response.body).toHaveProperty("state", "state here");
            expect(response.body).toHaveProperty("country", "Nepal");
        });

        it("should return error if user is not authorized", async () => {
            const usersAtStart = await usersInDb();
            const { user_id } = usersAtStart[0];

            const response = await api
                .put(`/api/users/${user_id}`)
                .set("auth-token", seekerAuth.token)
                .send({
                    username: "newcustUsername",
                    email: "newcustEmail@email.com",
                    fullname: "new man",
                    address: "address here",
                    city: "city here",
                    state: "state here",
                    country: "Nepal",
                    id: adminAuth.user_id,
                })
                .expect(401);

            expect(response.body).toHaveProperty("message", "Unauthorized");
        });
    });

    describe("delete user", () => {
        it("should delete a user if user is an admin", async () => {
            const usersAtStart = await usersInDb();
            const seeker = usersAtStart[1];

            await api
                .delete(`/api/users/${seeker.user_id}`)
                .set("auth-token", adminAuth.token);

            const usersAtEnd = await usersInDb();

            expect(usersAtEnd).toHaveLength(usersAtStart.length - 1);
        });

        it("should delete a user if user is authorized", async () => {
            const usersAtStart = await usersInDb();
            const seeker = usersAtStart[1];

            await api
                .delete(`/api/users/${seeker.user_id}`)
                .set("auth-token", seekerAuth.token)
                .expect(200);

            const usersAtEnd = await usersInDb();

            expect(usersAtEnd).toHaveLength(usersAtStart.length - 1);
        });

        it("should return error if user is not authorized", async () => {
            const usersAtStart = await usersInDb();
            const admin = usersAtStart[0];

            await api
                .delete(`/api/users/${admin.user_id}`)
                .set("auth-token", seekerAuth.token)
                .expect(401);

            const usersAtEnd = await usersInDb();

            expect(usersAtEnd).toHaveLength(usersAtStart.length);
        });
    });
});

// close the connection
afterAll(async () => {
    pool.end();
});