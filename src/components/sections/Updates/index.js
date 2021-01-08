import { useContext, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { REPORTS_PATH, ORDER_PATH, PRODUCTS_PATH } from "../../../config/routing/paths";
import api from "../../../config/services/api";
import UserContext from "../../../config/contexts/auth";

import { SectionTitle, Button } from "../../../styles/global";
import { Wrap, ResultTitle, ResultContent, Options } from "./style";

const Updates = () => {
    const reportPayload = useMemo(() => {
        return {
            initialDate: "1990-01-01",
            finalDate: new Date().toISOString().split("T")[0],
        };
    }, []);
    const [report, setReport] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.reports.get(reportPayload);
            if (response.status === 200) {
                setReport(response.data);
            }
        };
        fetchData();
    }, [reportPayload]);
    return (
        <section>
            <SectionTitle>Olá, {user.name}!</SectionTitle>
            {report && (
                <Wrap>
                    <SectionTitle>
                        Relatório total até hoje ({new Date(reportPayload.finalDate).toLocaleDateString("pt-BR")})
                    </SectionTitle>
                    <ResultTitle>Gastos Totais com Insumos:</ResultTitle>
                    <ResultContent>R$ {report.inputsTotal}</ResultContent>
                    <ResultTitle>Valor Total Recebido:</ResultTitle> <ResultContent>R$ {report.total}</ResultContent>
                    <ResultTitle>Lucro Obtido:</ResultTitle>
                    <ResultContent>R$ {report.profit}</ResultContent>
                    <Button to={REPORTS_PATH} as={Link}>
                        Ver o resultado por período
                    </Button>
                </Wrap>
            )}
            <Options>
                <SectionTitle>Você também pode:</SectionTitle>
                <Button inverted="true" to={PRODUCTS_PATH} as={Link}>
                    Registrar um Pedido
                </Button>{" "}
                <span>ou</span>
                <Button inverted="true" to={ORDER_PATH} as={Link}>
                    Cadastrar um Produto
                </Button>
            </Options>
        </section>
    );
};

export default Updates;
