import { useContext, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { REPORTS_PATH, ORDER_PATH, PRODUCTS_PATH } from "../../../config/routing/paths";
import api from "../../../config/services/api";
import UserContext from "../../../config/contexts/auth";

import { SectionTitle, Button } from "../../../styles/global";
import { Wrap, ResultTitle, ResultContent, Options } from "./style";

import { useTranslation } from "react-i18next";

const Updates = () => {
    const { t } = useTranslation();
    const today = new Date();
    const reportPayload = useMemo(() => {
        return {
            initialDate: "1990-01-01",
            finalDate: `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(-2)}-${(
                "0" + today.getDate()
            ).slice(-2)}`,
        };
    }, []);
    const [report, setReport] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.reports.get(reportPayload, user.id);
            if (response.status === 200) {
                setReport(response.data);
            }
        };
        fetchData();
    }, [reportPayload]);
    return (
        <section>
            <SectionTitle>
                {t("home.title")}, {user.name}!
            </SectionTitle>
            {report && (
                <Wrap>
                    <SectionTitle>
                        {t("home.report.title")} ({new Date().toLocaleDateString("pt-BR")})
                    </SectionTitle>
                    <ResultTitle>{t("home.report.c1")}:</ResultTitle>
                    <ResultContent>R$ {report.inputsTotal}</ResultContent>
                    <ResultTitle>{t("home.report.c2")}:</ResultTitle> <ResultContent>R$ {report.total}</ResultContent>
                    <ResultTitle>{t("home.report.c3")}:</ResultTitle>
                    <ResultContent>R$ {report.profit}</ResultContent>
                    <Button to={REPORTS_PATH} as={Link}>
                        {t("home.report.cta")}
                    </Button>
                </Wrap>
            )}
            <Options>
                <SectionTitle>{t("home.others.title")}:</SectionTitle>
                <Button inverted="true" to={PRODUCTS_PATH} as={Link}>
                    {t("home.others.cta1")}
                </Button>{" "}
                <span>ou</span>
                <Button inverted="true" to={ORDER_PATH} as={Link}>
                    {t("home.others.cta2")}
                </Button>
            </Options>
        </section>
    );
};

export default Updates;
