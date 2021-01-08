import { useEffect, useState, useContext } from "react";
import { OrdersContext } from "../../../config/contexts/orders";

import api from "../../../config/services/api";
import { Button, SectionTitle, Table } from "../../../styles/global";
import Modal from "../../reusables/Modal";
import { Item, InputItem, FlexWrap } from "./style";

const ListOrders = () => {
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
                    <SectionTitle>Número do Pedido: {data.id}</SectionTitle>
                    <Item>
                        <span>Preço Total:</span> R${data.totalPrice}
                    </Item>
                    <Item>
                        <span>Preço Total dos Insumos:</span> R${data.inputsPrice}
                    </Item>
                    <Item>
                        <span>Data de Criação:</span> {new Date(data.createdAt).toLocaleDateString("pt-BR")} às{" "}
                        {new Date(data.createdAt).toLocaleTimeString("pt-BR")}
                    </Item>
                    <Item>
                        <span>Produtos:</span>
                    </Item>
                    {data.products.map((product) => (
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
    };

    const deleteOrder = async (orderId) => {
        const response = await api.orders.delete(orderId);
        if (response.status === 200) {
            removeOrder(orderId);
            setModal(
                <Modal open={setModal}>
                    <Item>
                        O pedido de número <span>"{orderId}"</span> foi excluído com sucesso!
                    </Item>
                </Modal>
            );
        } else {
            setModal(
                <Modal open={setModal}>
                    <SectionTitle>Excluir Pedido</SectionTitle>
                    <Item>
                        Não foi possível excluir o pedido de número <span>"{orderId}"</span>! Tente novamente mais
                        tarde.
                    </Item>
                </Modal>
            );
        }
    };

    const deleteOrderConfirmation = (orderId) => {
        setModal(
            <Modal open={setModal}>
                <SectionTitle>Excluir Pedido</SectionTitle>
                <Item>
                    Tem certeza que deseja excluir o pedido de número <span>"{orderId}"</span>?
                </Item>
                <FlexWrap>
                    <Button inverted onClick={() => deleteOrder(orderId)}>
                        Sim
                    </Button>
                    <Button inverted onClick={() => setModal(null)}>
                        Não
                    </Button>
                </FlexWrap>
            </Modal>
        );
    };

    return (
        <div>
            <SectionTitle>Lista de Pedidos</SectionTitle>
            <Table>
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Preço Total</th>
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
                                <Button onClick={() => showDetails(order.id)}>Ver Detalhes</Button>
                            </td>
                            <td>
                                <Button inverted onClick={() => deleteOrderConfirmation(order.id, order.name)}>
                                    Excluir
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
