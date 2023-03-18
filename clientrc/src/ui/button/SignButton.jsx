import React from "react";
import classes from './MyButton.module.css'

const SignButton = ({ children, ...props }) => {
    return (
        <button {...props} className={classes.signinBtn}>
            {children}
        </button>
    );
};

export default SignButton;