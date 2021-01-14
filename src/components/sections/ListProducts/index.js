import { useEffect, useState, useContext } from "react";
import { ProductsContext } from "../../../config/contexts/products";
import UserContext from "../../../config/contexts/auth";

import api from "../../../config/services/api";
import { Button, SectionTitle, Table } from "../../../styles/global";
import Modal from "../../reusables/Modal";
import { Item, InputItem, FlexWrap } from "./style";

import { useTranslation } from "react-i18next";

const ListProducts = () => {
    const { t } = useTranslation();
    const { user } = useContext(UserContext);
    const { products, setProducts, removeProduct } = useContext(ProductsContext);
    const [modal, setModal] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await api.products.list(user.id);
            setProducts(response.data.products);
        }

        if (products.length === 0) {
            fetchData();
        }
    }, [products.length, setProducts]);

    const showDetails = async (productId) => {
        const response = await api.products.getOne(productId);
        const data = response.data;
        if (data.isAvaible) {
            setModal(
                <Modal open={setModal}>
                    <SectionTitle>{data.name}</SectionTitle>
                    <Item>
                        <span>{t("products.list.amount")}:</span> R${data.totalPrice}
                    </Item>
                    <Item>
                        <span>{t("products.register.profitPercentage")}:</span> {data.profitPercentage}%
                    </Item>
                    <Item>
                        <span>{t("products.list.inputs")}:</span>
                    </Item>
                    {data.inputs.map((input) => (
                        <InputItem key={input.id}>
                            <span>- {input.name}:</span>
                            <p>
                                {t("products.list.amount")}: R${input.totalPrice}
                            </p>
                            <p>
                                {t("products.register.profitPercentage")}: {input.usedPercentage}%
                            </p>
                        </InputItem>
                    ))}
                </Modal>
            );
        }
    };

    const deleteProduct = async (productId, productName) => {
        const response = await api.products.delete(productId);
        if (response.status === 200) {
            removeProduct(productId);
            setModal(
                <Modal open={setModal}>
                    <Item>
                        {t("products.delete.success.part1")} <span>"{productName}"</span>{" "}
                        {t("products.delete.success.part2")}!
                    </Item>
                </Modal>
            );
        } else {
            setModal(
                <Modal open={setModal}>
                    <SectionTitle>{t("products.delete.title")}</SectionTitle>
                    <Item>
                        {t("products.delete.error.part1")} <span>"{productName}"</span>!{" "}
                        {t("products.delete.error.part2")}.
                    </Item>
                </Modal>
            );
        }
    };

    const deleteProductConfirmation = (productId, productName) => {
        setModal(
            <Modal open={setModal}>
                <SectionTitle>Excluir Produto</SectionTitle>
                <Item>
                    {t("products.delete.confirmation")} <span>"{productName}"</span>?
                </Item>
                <FlexWrap>
                    <Button inverted onClick={() => deleteProduct(productId, productName)}>
                        {t("products.delete.yes")}
                    </Button>
                    <Button inverted onClick={() => setModal(null)}>
                        {t("products.delete.no")}
                    </Button>
                </FlexWrap>
            </Modal>
        );
    };

    return (
        <div>
            <SectionTitle>{t("products.list.title")}</SectionTitle>
            <Table>
                <thead>
                    <tr>
                        <th>{t("products.list.name")}</th>
                        <th>{t("products.list.amount")}</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>R${product.totalPrice}</td>
                            <td>
                                <Button onClick={() => showDetails(product.id)}>{t("products.list.showMore")}</Button>
                            </td>
                            <td>
                                <Button inverted onClick={() => deleteProductConfirmation(product.id, product.name)}>
                                    {t("products.list.delete")}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {modal}
        </div>
    );
};

export default ListProducts;
