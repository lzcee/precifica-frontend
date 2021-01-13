import { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { OrdersContext } from "../../../config/contexts/orders";

import api from "../../../config/services/api";
import { Button, SectionTitle, Table } from "../../../styles/global";
import Modal from "../../reusables/Modal";
import { Item, InputItem, FlexWrap } from "./style";

const ListOrders = () => {
    const { t } = useTranslation();
    const { orders, setOrders, removeOrder } = useContext(OrdersContext);
    const [modal, setModal] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await api.orders.list();
            setOrders(response.data.orders);
        }

        if (orders.length === 0) {
            fetchData();
        }
    }, [orders.length, setOrders]);

    const showDetails = async (orderId) => {
        const response = await api.orders.getOne(orderId);
        const data = response.data;
        if (data.isAvaible) {
            setModal(
                <Modal open={setModal}>
                    <SectionTitle>
                        {t("orders.modal.number")}: {data.id}
                    </SectionTitle>
                    <Item>
                        <span>{t("orders.modal.amount")}:</span> R${data.totalPrice}
                    </Item>
                    <Item>
                        <span>{t("orders.modal.inputsPrice")}:</span> R${data.inputsPrice}
                    </Item>
                    <Item>
                        <span>{t("orders.modal.createdAt")}:</span>{" "}
                        {new Date(data.createdAt).toLocaleDateString("pt-BR")} {t("orders.modal.at")}{" "}
                        {new Date(data.createdAt).toLocaleTimeString("pt-BR")}
                    </Item>
                    <Item>
                        <span>{t("orders.modal.products.title")}:</span>
                    </Item>
                    {data.products.map((product) => (
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
    };

    const deleteOrder = async (orderId) => {
        const response = await api.orders.delete(orderId);
        if (response.status === 200) {
            removeOrder(orderId);
            setModal(
                <Modal open={setModal}>
                    <Item>
                        {t("orders.delete.success.part1")} <span>"{orderId}"</span> {t("orders.delete.success.part2")}!
                    </Item>
                </Modal>
            );
        } else {
            setModal(
                <Modal open={setModal}>
                    <SectionTitle>{t("orders.delete.title")}</SectionTitle>
                    <Item>
                        {t("orders.delete.error.part1")} <span>"{orderId}"</span>! {t("orders.delete.error.part2")}.
                    </Item>
                </Modal>
            );
        }
    };

    const deleteOrderConfirmation = (orderId) => {
        setModal(
            <Modal open={setModal}>
                <SectionTitle>{t("orders.delete.title")}</SectionTitle>
                <Item>
                    {t("orders.delete.confirmation")} <span>"{orderId}"</span>?
                </Item>
                <FlexWrap>
                    <Button inverted onClick={() => deleteOrder(orderId)}>
                        {t("orders.delete.yes")}
                    </Button>
                    <Button inverted onClick={() => setModal(null)}>
                        {t("orders.delete.no")}
                    </Button>
                </FlexWrap>
            </Modal>
        );
    };

    return (
        <div>
            <SectionTitle>{t("orders.list.title")}</SectionTitle>
            <Table>
                <thead>
                    <tr>
                        <th>{t("orders.list.number")}</th>
                        <th>{t("orders.list.date")}</th>
                        <th>{t("orders.list.hour")}</th>
                        <th>{t("orders.list.amount")}</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{new Date(order.createdAt).toLocaleDateString("pt-BR")}</td>
                            <td>{new Date(order.createdAt).toLocaleTimeString("pt-BR")}</td>
                            <td>R${order.totalPrice}</td>
                            <td>
                                <Button onClick={() => showDetails(order.id)}>{t("orders.list.showMore")}</Button>
                            </td>
                            <td>
                                <Button inverted onClick={() => deleteOrderConfirmation(order.id, order.name)}>
                                    {t("orders.list.delete")}
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

export default ListOrders;
