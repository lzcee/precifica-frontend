import CreateOrder from "../../components/sections/CreateOrder";
import Layout from "../../components/sections/Layout";
import ListOrders from "../../components/sections/ListOrders";
import OrdersProvider from "../../config/contexts/orders";

const Order = () => {
    return (
        <OrdersProvider>
            <Layout>
                <CreateOrder />
                <ListOrders />
            </Layout>
        </OrdersProvider>
    );
};

export default Order;
