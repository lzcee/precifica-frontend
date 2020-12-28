import { useEffect, useState } from "react";

import api from "../../../config/services/api";
import { Button, SectionTitle, Table } from "../../../styles/global";
import Modal from "../../reusables/Modal";
import { Item, InputItem, FlexWrap } from "./style";

const ListProducts = () => {
    const [products, setProducts] = useState([]);
    const [modal, setModal] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await api.products.list();
            setProducts(response.data.products);
        }
        fetchData();
    }, [modal]);

    const showDetails = async (productId) => {
        const response = await api.products.getOne(productId);
        const data = response.data;
        if (data.isAvaible) {
            setModal(
                <Modal open={setModal}>
                    <SectionTitle>{data.name}</SectionTitle>
                    <Item>
                        <span>Preço Total:</span> R${data.totalPrice}
                    </Item>
                    <Item>
                        <span>Porcentagem de Lucro:</span> {data.profitPercentage}%
                    </Item>
                    <Item>
                        <span>Insumos:</span>
                    </Item>
                    <Item>
                        {data.inputs.map((input) => (
                            <InputItem>
                                <span>- {input.name}:</span>
                                <p>Preço Total: R${input.totalPrice}</p>
                                <p>Porcentagem de Uso: {input.usedPercentage}%</p>
                            </InputItem>
                        ))}
                    </Item>
                </Modal>
            );
        }
    };

    const deleteProduct = async (productId, productName) => {
        const response = await api.products.delete(productId);
        if (response.status === 200) {
            setModal(
                <Modal open={setModal}>
                    <Item>
                        O produto <span>"{productName}"</span> foi excluído com sucesso!
                    </Item>
                </Modal>
            );
        } else {
            setModal(
                <Modal open={setModal}>
                    <SectionTitle>Excluir Produto</SectionTitle>
                    <Item>
                        Não foi possível excluir o produto <span>"{productName}"</span>! Tente novamente mais tarde.
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
                    Tem certeza que deseja excluir o produto <span>"{productName}"</span>?
                </Item>
                <FlexWrap>
                    <Button inverted onClick={() => deleteProduct(productId, productName)}>
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
            <SectionTitle>Lista de Produtos</SectionTitle>
            <Table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço Total</th>
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
                                <Button onClick={() => showDetails(product.id)}>Ver Detalhes</Button>
                            </td>
                            <td>
                                <Button inverted onClick={() => deleteProductConfirmation(product.id, product.name)}>
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

export default ListProducts;
