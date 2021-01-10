import { useState, useContext, useEffect } from "react";
import api from "../../../config/services/api";
import UserContext from "../../../config/contexts/auth";
import { ProductsContext } from "../../../config/contexts/products";
import { OrdersContext } from "../../../config/contexts/orders";

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

import { useTranslation } from "react-i18next";

const CreateOrder = () => {
    const { t } = useTranslation();
    const { user } = useContext(UserContext);
    const { products, setProducts } = useContext(ProductsContext);
    const { saveOrder } = useContext(OrdersContext);

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
                saveOrder(response.data);
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
                        <SectionTitle>
                            {t("orders.modal.number")}: {response.data.id}
                        </SectionTitle>
                        <Item>
                            <span>{t("orders.modal.amount")}:</span> R${response.data.totalPrice}
                        </Item>
                        <Item>
                            <span>{t("orders.modal.inputsPrice")}:</span> R${response.data.inputsPrice}
                        </Item>
                        <Item>
                            <span>{t("orders.modal.createdAt")}:</span>{" "}
                            {new Date(response.data.createdAt).toLocaleDateString("pt-BR")} {t("orders.modal.at")}{" "}
                            {new Date(response.data.createdAt).toLocaleTimeString("pt-BR")}
                        </Item>
                        <Item>
                            <span>{t("orders.modal.products.title")}:</span>
                        </Item>
                        {response.data.products.map((product) => (
                            <InputItem key={product.id}>
                                <span>- {product.name}:</span>
                                <p>
                                    {t("orders.modal.products.amount")}: R${product.totalPrice}
                                </p>
                                <p>
                                    {t("orders.modal.products.inputsPrice")}: R${product.inputsPrice}
                                </p>
                                <p>
                                    {t("orders.modal.products.profitPercentage")}: {product.profitPercentage}%
                                </p>
                            </InputItem>
                        ))}
                    </Modal>
                );
            }
        } catch (e) {
            setError(`${t("orders.register.error")}`);
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
            <SectionTitle>{t("orders.register.title")}</SectionTitle>
            <Label>{t("orders.register.products")}</Label>
            {productsField.map((input, index) => (
                <InputsWrap key={input}>
                    <WrapSelect
                        size="small"
                        value={listProducts[index].productId === "" ? null : listProducts[index]}
                        onChange={(event, newValue) => selectProduct(newValue, index)}
                        options={products}
                        getOptionLabel={(product) => product.name}
                        renderInput={(params) => (
                            <Select {...params} label={t("orders.register.select")} variant="outlined" />
                        )}
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
                {t("orders.register.add")}
            </AddInput>
            <Total>
                {t("orders.register.amount")}: R$ {total}
            </Total>
            <Button type="submit" onClick={handleClick}>
                {t("orders.register.register")}
            </Button>
            <ErrorMessage>{error}</ErrorMessage>
            {modal}
        </FormWrapper>
    );
};

export default CreateOrder;
