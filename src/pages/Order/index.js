import CreateOrder from "../../components/sections/CreateOrder";
import Layout from "../../components/reusables/Layout";
import ListOrders from "../../components/sections/ListOrders";

const Order = () => {
    return (
        <Layout>
            <CreateOrder />
            <ListOrders />
        </Layout>
    );
};

export default Order;
