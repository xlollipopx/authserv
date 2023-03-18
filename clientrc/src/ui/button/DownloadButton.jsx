import React from "react";
import classes from './MyButton.module.css'

const DownloadButton = ({ children, ...props }) => {
    return (
        <button {...props} className={classes.dwBtn}>
            {children}
        </button>
    );
};

export default DownloadButton;