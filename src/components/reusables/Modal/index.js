const Modal = ({ open, children }) => {
    return (
        <div>
            <button onClick={(e) => open(false)}>close</button>
            {children}
        </div>
    );
};

export default Modal;
