import React from "react";
import classes from './MyModal.module.css'

const MyModal = ({ children, visible, setVisible }) => {

    let clsList = [classes.MyModal];
    if (visible) {
        clsList.push(classes.active);
    }

    return (
        <div className={clsList.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.MyModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );

};

export default MyModal;