import { useContext } from "react";

import UserContext from "../../../config/contexts/auth";
import { SectionTitle } from "../../../styles/global";

const Updates = () => {
    const { user } = useContext(UserContext);
    return (
        <section>
            <SectionTitle>Olá, {user.name}!</SectionTitle>
        </section>
    );
};

export default Updates;
