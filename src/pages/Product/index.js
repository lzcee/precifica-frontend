import Layout from "../../components/sections/Layout";
import CreateProduct from "../../components/sections/CreateProduct";
import ListProducts from "../../components/sections/ListProducts";

const Product = () => {
    return (
        <Layout>
            <CreateProduct />
            <ListProducts />
        </Layout>
    );
};

export default Product;
