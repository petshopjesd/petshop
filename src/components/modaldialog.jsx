    import React, { useRef, useEffect } from 'react';
    import g from '../css/generaladm.module.css'

    const Modaldialog = ({ isOpen, onClose, children }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        onClose();
    };

    return (
        <dialog className={g.dialogE} ref={dialogRef} onClose={handleClose}>
            <div className={g.dialogcerra}>
                <img src='/imgs/close.png' onClick={handleClose}></img>
            </div>
        {children}
        </dialog>
        );
    };

    export default Modaldialog;