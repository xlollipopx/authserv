import React, { useState } from "react";
import MyButton from "../../ui/button/MyButton";
import SignButton from "../../ui/button/SignButton";
import MyInput from "../../ui/input/MyInput";
import axios from 'axios';
import classes from './ErrorText.module.css'



const SignUpForm = ({ setVisible, setSignInVisible }) => {

    const [data, setData] = useState({ mail: '', password: '' })
    let [visibleCls, setVisibleCls] = useState(classes.Inactive);

    const signUp = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/registration', {
            email: data.mail,
            password: data.password
        })
            .then(function (response) {
                setVisibleCls(classes.Inactive);
                setVisible(false);
                setSignInVisible(true);
            })
            .catch(function (error) {
                setVisibleCls(classes.Active);

            });

    }


    return (
        <form className='form-column'>
            <div className="singin-text">Sign Up</div>
            <MyInput type='text' value={data.mail} placeholder='Email' onChange={event => { setData({ ...data, mail: event.target.value }) }} />
            <MyInput type='text' placeholder='Full Name' />
            <MyInput type='password' value={data.password} placeholder='Password' onChange={event => { setData({ ...data, password: event.target.value }) }} />
            <div className={visibleCls}>Invalid data. Please, try again.</div>
            <div className='btn-row'>
                <SignButton onClick={signUp}>Sing Up</SignButton>
            </div>
        </form>
    );

}

export default SignUpForm;