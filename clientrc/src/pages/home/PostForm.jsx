import React, { useState } from "react";
import MyButton from "../../ui/button/MyButton";
import SignButton from "../../ui/button/SignButton";
import { useNavigate } from "react-router-dom";

import MyInput from "../../ui/input/MyInput";
import classes from './ErrorText.module.css'
import Cookies from 'js-cookie';


import axios from 'axios';


const PostForm = ({ setVisible }) => {

    const [data, setData] = useState({ mail: '', password: '' })
    let [visibleCls, setVisibleCls] = useState(classes.Inactive);
    const navigate = useNavigate();


    const singIn = (e) => {
        e.preventDefault();

        axios.post('http://78.140.252.69/api/login', {
            email: data.mail,
            password: data.password
        })
            .then(function (response) {

                setVisible(false);
                setVisibleCls(classes.Inactive);
                Cookies.set('token', response.data.token);
                navigate("/account");

            })
            .catch(function (error) {

                setVisibleCls(classes.Active);
            });



    }


    return (
        <form className='form-column'>
            <div className="singin-text">Sign In</div>
            <MyInput type='text' value={data.mail} placeholder='Email' onChange={event => { setData({ ...data, mail: event.target.value }) }} />
            <MyInput type='password' value={data.password} placeholder='Password' onChange={event => { setData({ ...data, password: event.target.value }) }} />
            <div className={visibleCls}>Invalid credentials. Please, try again.</div>
            <div className='btn-row'>
                <SignButton onClick={singIn}>Sing In</SignButton>
            </div>
        </form>
    );

}

export default PostForm;