import React, { useState } from "react";
import MyButton from "../../ui/button/MyButton";
import SignButton from "../../ui/button/SignButton";
import MyInput from "../../ui/input/MyInput";


const PostForm = ({ setVisible }) => {

    const [data, setData] = useState({ mail: '', password: '' })

    const singIn = (e) => {
        e.preventDefault();

        // axios.get('http://78.140.252.62/api/login')
        //     .then(function (response) {
        //         setStart(response.data);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });


        //add sign in logic

        setVisible(false);
    }


    return (
        <form className='form-column'>
            <div className="singin-text">Sign In</div>
            <MyInput type='text' value={data.mail} placeholder='Email' onChange={event => { setData({ ...data, mail: event.target.value }) }} />
            <MyInput type='password' value={data.password} placeholder='Password' onChange={event => { setData({ ...data, password: event.target.value }) }} />
            <div className='btn-row'>
                <SignButton onClick={singIn}>Sing In</SignButton>
            </div>
        </form>
    );

}

export default PostForm;