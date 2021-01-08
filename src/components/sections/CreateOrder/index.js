import { useState, useContext, useEffect } from "react";
import api from "../../../config/services/api";
import UserContext from "../../../config/contexts/auth";
import { ProductsContext } from "../../../config/contexts/products";

import Modal from "../../reusables/Modal";
import {
    FormWrapper,
    Label,
    InputsWrap,
    AddInput,
    ErrorMessage,
    Select,
    WrapSelect,
    Total,
    Item,
    InputItem,
} from "./style";
import { SectionTitle, Button } from "../../../styles/global";

import { GrAdd } from "react-icons/gr";

const CreateOrder = () => {
    const { user } = useContext(UserContext);
    const { products, setProducts } = useContext(ProductsContext);

    const [error, setError] = useState("");
    const [modal, setModal] = useState(null);
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
    }, [products.length, setProducts]);

    const handleClick = async () => {
        const productsIds = [];
        listProducts.forEach((product) => {
            if (product.productId !== "") {
                productsIds.push(product.productId);
            }
        });
        const order = {
            productsIds,
            userId: user.id,
        };
        setError("");
        try {
            const response = await api.orders.create(order);
            if (response.status === 201) {
                setProductsField(["input-0"]);
                setListProducts([
                    {
                        name: "",
                        productId: "",
                        totalPrice: "",
                    },
                ]);
                setTotal(0);
                setModal(
                    <Modal open={setModal}>
                        <SectionTitle>Número do Pedido: {response.data.id}</SectionTitle>
                        <Item>
                            <span>Preço Total:</span> R${response.data.totalPrice}
                        </Item>
                        <Item>
                            <span>Preço Total dos Insumos:</span> R${response.data.inputsPrice}
                        </Item>
                        <Item>
                            <span>Data de Criação:</span>{" "}
                            {new Date(response.data.createdAt).toLocaleDateString("pt-BR")} às{" "}
                            {new Date(response.data.createdAt).toLocaleTimeString("pt-BR")}
                        </Item>
                        <Item>
                            <span>Produtos:</span>
                        </Item>
                        {response.data.products.map((product) => (
                            <InputItem key={product.id}>
                                <span>- {product.name}:</span>
                                <p>Preço Total: R${product.totalPrice}</p>
                                <p>Preço dos Insumos: R${product.inputsPrice}</p>
                                <p>Porcentagem de Lucro: {product.profitPercentage}%</p>
                            </InputItem>
                        ))}
                    </Modal>
                );
            }
        } catch (e) {
            setError("Ops! Ocorreu um erro, tente novamente!");
        }
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
            <Label>Produtos</Label>
            {productsField.map((input, index) => (
                <InputsWrap key={input}>
                    <WrapSelect
                        size="small"
                        value={listProducts[index].productId === "" ? null : listProducts[index]}
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
            <Total>Total: R$ {total}</Total>
            <Button type="submit" onClick={handleClick}>
                Registrar
            </Button>
            <ErrorMessage>{error}</ErrorMessage>
            {modal}
        </FormWrapper>
    );
};

export default CreateOrder;
