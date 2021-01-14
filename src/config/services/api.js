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
    list(userId) {
        return api.get(`/products/all/${userId}`);
    },
    getOne(payload) {
        return api.get(`/products/${payload}`);
    },
    delete(payload) {
        return api.post(`/products/delete/${payload}`);
    },
};

const orders = {
    create(payload) {
        return api.post("/order", payload);
    },
    list(userId) {
        return api.get(`/order/all/${userId}`);
    },
    getOne(payload) {
        return api.get(`/order/${payload}`);
    },
    delete(payload) {
        return api.post(`/order/delete/${payload}`);
    },
};

const reports = {
    get(payload, userId) {
        return api.get(`/reports?initialDate=${payload.initialDate}&finalDate=${payload.finalDate}&user=${userId}`);
    },
};

const apiSettings = {
    users,
    products,
    orders,
    reports,
};

export default apiSettings;
