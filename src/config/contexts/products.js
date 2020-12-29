import { createContext, useState } from "react";

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const saveProduct = (product) => {
        setProducts([...products, product]);
    };

    const removeProduct = (productId) => {
        setProducts(products.filter((product) => product.id !== productId));
    };

    return (
        <ProductsContext.Provider value={{ products, setProducts, saveProduct, removeProduct }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;
