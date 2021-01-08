import { useState, useContext, useEffect } from "react";
import api from "../../../config/services/api";
import UserContext from "../../../config/contexts/auth";
import { ProductsContext } from "../../../config/contexts/products";

import { Autocomplete } from "@material-ui/lab";
import { FormWrapper, Label, InputsWrap, AddInput, ErrorMessage, Select, WrapSelect, Total } from "./style";
import { SectionTitle, Button } from "../../../styles/global";

import { GrAdd } from "react-icons/gr";

const CreateOrder = () => {
    const { user } = useContext(UserContext);
    const { products, setProducts } = useContext(ProductsContext);

    const [error, setError] = useState("");
    const [total, setTotal] = useState(0);
    const [productsField, setProductsField] = useState(["input-0"]);
    const [listProducts, setListProducts] = useState([
        {
            name: "",
            productId: "",
            totalPrice: "",
        },
    ]);

    useEffect(() => {
        async function fetchData() {
            const response = await api.products.list();
            setProducts(response.data.products);
        }

        if (products.length === 0) {
            fetchData();
        }
    }, []);

    const handleClick = async () => {
        setError("");
    };

    const selectProduct = (newValue, index) => {
        let prevInputs = listProducts;
        if (newValue) {
            prevInputs[index].name = newValue.name;
            prevInputs[index].productId = newValue.id;
            prevInputs[index].totalPrice = newValue.totalPrice;
        } else {
            prevInputs[index].name = "";
            prevInputs[index].productId = "";
            prevInputs[index].totalPrice = "";
        }
        setListProducts(prevInputs);
        let sum = 0;
        listProducts.forEach((product) => {
            if (product.totalPrice !== "") {
                sum += parseFloat(product.totalPrice);
            }
        });
        setTotal(sum.toFixed(2));
    };

    return (
        <FormWrapper>
            <SectionTitle>Registrar Pedido</SectionTitle>
            <Total>Total: R$ {total}</Total>
            <Label>Produtos</Label>
            {productsField.map((input, index) => (
                <InputsWrap key={input}>
                    <WrapSelect
                        onChange={(event, newValue) => selectProduct(newValue, index)}
                        options={products}
                        getOptionLabel={(product) => product.name}
                        renderInput={(params) => <Select {...params} label="Selecione um Produto" variant="outlined" />}
                    />
                </InputsWrap>
            ))}
            <AddInput
                onClick={() => {
                    const prevInputs = listProducts;
                    prevInputs.push({
                        name: "",
                        productId: "",
                        totalPrice: "",
                    });
                    setListProducts(prevInputs);
                    setProductsField(productsField.concat(`input-${productsField.length}`));
                }}
            >
                <GrAdd />
                Adicionar Produto
            </AddInput>
            <Button type="submit" onClick={handleClick}>
                Registrar
            </Button>
            <ErrorMessage>{error}</ErrorMessage>
        </FormWrapper>
    );
};

export default CreateOrder;
