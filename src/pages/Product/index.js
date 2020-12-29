import Layout from "../../components/sections/Layout";
import CreateProduct from "../../components/sections/CreateProduct";
import ListProducts from "../../components/sections/ListProducts";
import ProductsProvider from "../../config/contexts/products";

const Product = () => {
    return (
        <ProductsProvider>
            <Layout>
                <CreateProduct />
                <ListProducts />
            </Layout>
        </ProductsProvider>
    );
};

export default Product;
