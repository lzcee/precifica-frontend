import { useState, useContext } from "react";
import api from "../../../config/services/api";
import UserContext from "../../../config/contexts/auth";
import { ProductsContext } from "../../../config/contexts/products";

import FormInput from "../../reusables/FormInput";
import { FormWrapper, Label, InputsWrap, AddInput, ErrorMessage } from "./style";
import { SectionTitle, Button } from "../../../styles/global";

import { GrAdd } from "react-icons/gr";

import { useTranslation } from "react-i18next";

const CreateProduct = () => {
    const { t } = useTranslation();
    const { user } = useContext(UserContext);
    const { saveProduct } = useContext(ProductsContext);
    const [inputs, setInputs] = useState(["input-0"]);
    const [product, setProduct] = useState({
        name: "",
        userId: user.id,
        profitPercentage: "",
        inputs: [
            {
                name: "",
                totalPrice: "",
                usedPercentage: "",
            },
        ],
    });
    const [error, setError] = useState("");

    const handleClick = async () => {
        setError("");
        try {
            const response = await api.products.create(product);
            if (response.status === 201) {
                saveProduct(response.data);
                setInputs(["input-0"]);
                setProduct({
                    name: "",
                    userId: user.id,
                    profitPercentage: "",
                    inputs: [
                        {
                            name: "",
                            totalPrice: "",
                            usedPercentage: "",
                        },
                    ],
                });
            }
        } catch (e) {
            setError(`${t("products.register.error")}`);
        }
    };

    return (
        <FormWrapper>
            <SectionTitle>{t("products.register.title")}</SectionTitle>
            <FormInput
                name="name"
                type="text"
                onChange={(e) =>
                    setProduct({
                        ...product,
                        name: e.target.value,
                    })
                }
                value={product.name}
                placeholder={t("products.register.name")}
            />
            <FormInput
                name="profitPercentage"
                type="number"
                onChange={(e) =>
                    setProduct({
                        ...product,
                        profitPercentage: e.target.value,
                    })
                }
                value={product.profitPercentage}
                placeholder={t("products.register.profitPercentage")}
            />
            <Label>Insumos</Label>
            {inputs.map((input, index) => (
                <InputsWrap key={input}>
                    <FormInput
                        name="inputName"
                        type="text"
                        placeholder={t("products.register.input.name")}
                        onChange={(e) => {
                            let prevInputs = product.inputs;
                            prevInputs[index].name = e.target.value;
                            setProduct({
                                ...product,
                                inputs: prevInputs,
                            });
                        }}
                        value={product.inputs[index].name}
                    />
                    <FormInput
                        name="totalPrice"
                        type="number"
                        placeholder={t("products.register.input.amount")}
                        onChange={(e) => {
                            let prevInputs = product.inputs;
                            prevInputs[index].totalPrice = e.target.value;
                            setProduct({
                                ...product,
                                inputs: prevInputs,
                            });
                        }}
                        value={product.inputs[index].totalPrice}
                    />
                    <FormInput
                        name="usedPercentage"
                        type="number"
                        placeholder={t("products.register.input.usedPercentage")}
                        onChange={(e) => {
                            let prevInputs = product.inputs;
                            prevInputs[index].usedPercentage = e.target.value;
                            setProduct({
                                ...product,
                                inputs: prevInputs,
                            });
                        }}
                        value={product.inputs[index].usedPercentage}
                    />
                </InputsWrap>
            ))}
            <AddInput
                onClick={() => {
                    const prevInputs = product.inputs;
                    prevInputs.push({
                        name: "",
                        totalPrice: "",
                        usedPercentage: "",
                    });
                    setProduct({
                        ...product,
                        inputs: prevInputs,
                    });
                    setInputs(inputs.concat(`input-${inputs.length}`));
                }}
            >
                <GrAdd />
                {t("products.register.add")}
            </AddInput>
            <Button type="submit" onClick={handleClick}>
                {t("products.register.register")}
            </Button>
            <ErrorMessage>{error}</ErrorMessage>
        </FormWrapper>
    );
};

export default CreateProduct;
