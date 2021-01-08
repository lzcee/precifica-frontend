import { createContext, useState } from "react";

export const OrdersContext = createContext();

const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    const saveOrder = (order) => {
        setOrders([...orders, order]);
    };

    const removeOrder = (orderId) => {
        setOrders(orders.filter((order) => order.id !== orderId));
    };

    return (
        <OrdersContext.Provider value={{ orders, setOrders, saveOrder, removeOrder }}>
            {children}
        </OrdersContext.Provider>
    );
};

export default OrdersProvider;
