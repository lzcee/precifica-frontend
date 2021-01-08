import { useState } from "react";
import api from "../../../config/services/api";

import { SectionTitle, Button } from "../../../styles/global";
import { Label, ErrorMessage, FlexWrap, Title, Wrap, ResultTitle, ResultContent } from "./style";
import FormInput from "../../reusables/FormInput";

const GenerateReport = () => {
    const today = new Date();
    let oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const [initialDate, setInitialDate] = useState(oneMonthAgo.toISOString().split("T")[0]);
    const [finalDate, setFinalDate] = useState(today.toISOString().split("T")[0]);
    const [report, setReport] = useState(null);
    const [error, setError] = useState("");

    const validateDate = () => {
        if (initialDate <= finalDate) {
            return true;
        }
        return false;
    };

    const handleClick = async () => {
        if (validateDate()) {
            const payload = {
                initialDate,
                finalDate,
            };
            setError("");
            try {
                const response = await api.reports.get(payload);
                if (response.status === 200) {
                    setReport(response.data);
                }
            } catch (e) {
                setError("Ops! Ocorreu um erro, tente novamente!");
            }
        } else {
            setError("Ops! A data de início deve ser menor que a final!");
        }
    };

    return (
        <div>
            <SectionTitle>Relatório de Vendas</SectionTitle>
            <Title>Selecione o período:</Title>
            <FlexWrap>
                <div>
                    <Label>Início</Label>
                    <FormInput
                        name="initialDate"
                        type="date"
                        value={initialDate}
                        onChange={(e) => setInitialDate(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Fim</Label>
                    <FormInput
                        name="finalDate"
                        type="date"
                        value={finalDate}
                        onChange={(e) => setFinalDate(e.target.value)}
                    />
                </div>
                <div>
                    <Button onClick={handleClick}>Gerar Relatório</Button>
                </div>
                <ErrorMessage>{error}</ErrorMessage>
            </FlexWrap>
            {report && (
                <Wrap>
                    <SectionTitle>
                        Período: {new Date(initialDate).toLocaleDateString("pt-BR")} até{" "}
                        {new Date(finalDate).toLocaleDateString("pt-BR")}
                    </SectionTitle>
                    <ResultTitle>Gastos Totais com Insumos:</ResultTitle>
                    <ResultContent>R$ {report.inputsTotal}</ResultContent>
                    <ResultTitle>Valor Total Recebido:</ResultTitle> <ResultContent>R$ {report.total}</ResultContent>
                    <ResultTitle>Lucro Obtido:</ResultTitle>
                    <ResultContent>R$ {report.profit}</ResultContent>
                </Wrap>
            )}
        </div>
    );
};

export default GenerateReport;
