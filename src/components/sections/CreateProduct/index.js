import { useState, useContext } from "react";
import api from "../../../config/services/api";
import UserContext from "../../../config/contexts/auth";

import FormInput from "../../reusables/FormInput";
import { FormWrapper, Label, InputsWrap, AddInput, ErrorMessage } from "./style";
import { SectionTitle, Button } from "../../../styles/global";

import { GrAdd } from "react-icons/gr";

const CreateProduct = () => {
    const { user } = useContext(UserContext);
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
            if (response.data) {
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
            setError("Ops! Ocorreu um erro, tente novamente!");
        }
    };

    return (
        <FormWrapper>
            <SectionTitle>Cadastrar Produto</SectionTitle>
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
                placeholder="Nome do Produto"
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
                placeholder="Porcentagem de Lucro"
            />
            <Label>Insumos</Label>
            {inputs.map((input, index) => (
                <InputsWrap key={input}>
                    <FormInput
                        name="inputName"
                        type="text"
                        placeholder="Nome do Insumo"
                        onChange={(e) => {
                            let prevInputs = product.inputs;
                            prevInputs[index].name = e.target.value;
                            setProduct({
                                ...product,
                                inputs: prevInputs,
                            });
                        }}
                    />
                    <FormInput
                        name="totalPrice"
                        type="number"
                        placeholder="Preço Total"
                        onChange={(e) => {
                            let prevInputs = product.inputs;
                            prevInputs[index].totalPrice = e.target.value;
                            setProduct({
                                ...product,
                                inputs: prevInputs,
                            });
                        }}
                    />
                    <FormInput
                        name="usedPercentage"
                        type="number"
                        placeholder="Porcentagem de Uso"
                        onChange={(e) => {
                            let prevInputs = product.inputs;
                            prevInputs[index].usedPercentage = e.target.value;
                            setProduct({
                                ...product,
                                inputs: prevInputs,
                            });
                        }}
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
                Adicionar Insumo
            </AddInput>
            <Button type="submit" onClick={handleClick}>
                Cadastrar
            </Button>
            <ErrorMessage>{error}</ErrorMessage>
        </FormWrapper>
    );
};

export default CreateProduct;
