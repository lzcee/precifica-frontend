import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/",
});

const users = {
    register(payload) {
        return api.post("/users/registration", payload);
    },
    login(payload) {
        return api.post("/users/login", payload);
    },
};

const products = {
    create(payload) {
        return api.post("/products", payload);
    },
};

export default {
    users,
    products,
};
