import { useEffect, useState } from "react";

import api from "../../../config/services/api";
import { Button, SectionTitle, Table } from "../../../styles/global";
import Modal from "../../reusables/Modal";

const ListProducts = () => {
    const [products, setProducts] = useState([]);
    const [modal, setModal] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await api.products.list();
            setProducts(response.data.products);
        }
        fetchData();
    }, []);

    const showDetails = async (productId) => {
        const response = await api.products.getOne(productId);
        const data = response.data;
        if (data.isAvaible) {
            setModal(
                <Modal open={setModal}>
                    <div>
                        <p>Nome: {data.name}</p>
                    </div>
                </Modal>
            );
        }
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
                            <td>R$ {product.totalPrice}</td>
                            <td>
                                <Button onClick={() => showDetails(product.id)}>Ver Detalhes</Button>
                            </td>
                            <td>
                                <Button>Excluir</Button>
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
