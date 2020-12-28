import { ModalWrapper, Content, CloseModal } from "./style";

import { MdClose } from "react-icons/md";

const Modal = ({ open, children }) => {
    return (
        <ModalWrapper>
            <Content>
                <CloseModal onClick={(e) => open(false)}>
                    <MdClose />
                </CloseModal>
                {children}
            </Content>
        </ModalWrapper>
    );
};

export default Modal;
