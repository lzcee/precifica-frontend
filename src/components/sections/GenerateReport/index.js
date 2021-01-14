import { useState, useContext } from "react";
import api from "../../../config/services/api";
import UserContext from "../../../config/contexts/auth";

import { SectionTitle, Button } from "../../../styles/global";
import { Label, ErrorMessage, FlexWrap, Title, Wrap, ResultTitle, ResultContent } from "./style";
import FormInput from "../../reusables/FormInput";

import { useTranslation } from "react-i18next";

const GenerateReport = () => {
    const { t } = useTranslation();
    const { user } = useContext(UserContext);
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
                const response = await api.reports.get(payload, user.id);
                if (response.status === 200) {
                    setReport(response.data);
                }
            } catch (e) {
                setError(`${t("reports.errors.e1")}`);
            }
        } else {
            setError(`${t("reports.errors.e2")}`);
        }
    };

    return (
        <div>
            <SectionTitle>{t("reports.title")}</SectionTitle>
            <Title>{t("reports.period.title")}:</Title>
            <FlexWrap>
                <div>
                    <Label>{t("reports.period.initial")}</Label>
                    <FormInput
                        name="initialDate"
                        type="date"
                        value={initialDate}
                        onChange={(e) => setInitialDate(e.target.value)}
                    />
                </div>
                <div>
                    <Label>{t("reports.period.end")}</Label>
                    <FormInput
                        name="finalDate"
                        type="date"
                        value={finalDate}
                        onChange={(e) => setFinalDate(e.target.value)}
                    />
                </div>
                <div>
                    <Button onClick={handleClick}>{t("reports.cta")}</Button>
                </div>
                <ErrorMessage>{error}</ErrorMessage>
            </FlexWrap>
            {report && (
                <Wrap>
                    <SectionTitle>
                        {t("reports.report.period")}: {new Date(initialDate).toLocaleDateString("pt-BR")}{" "}
                        {t("reports.report.at")} {new Date(finalDate).toLocaleDateString("pt-BR")}
                    </SectionTitle>
                    <ResultTitle>{t("reports.report.inputAmount")}:</ResultTitle>
                    <ResultContent>R$ {report.inputsTotal}</ResultContent>
                    <ResultTitle>{t("reports.report.receivedAmount")}:</ResultTitle>{" "}
                    <ResultContent>R$ {report.total}</ResultContent>
                    <ResultTitle>{t("reports.report.profit")}:</ResultTitle>
                    <ResultContent>R$ {report.profit}</ResultContent>
                </Wrap>
            )}
        </div>
    );
};

export default GenerateReport;
