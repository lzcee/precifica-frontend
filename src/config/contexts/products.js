import { createContext, useState } from "react";

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const saveProduct = (product) => {
        setProducts([...products, product]);
    };

    return (
        <ProductsContext.Provider value={{ products, setProducts, saveProduct }}>{children}</ProductsContext.Provider>
    );
};

export default ProductsProvider;
