
import axios from 'axios';
import React, { useState } from 'react';
import MyButton from '../../ui/button/MyButton';
import DownloadButton from '../../ui/button/DownloadButton';
import MyModal from '../../ui/MyModal/MyModal';
import FileDownload from "js-file-download"
import PostForm from './PostForm';
import loginimg from '../loginprev.jpg';
import apprevimg from '../appprev.jpg';
import SignUpForm from './SignUpform';


const Home = () => {

    const [visible, setVisible] = useState(false);
    const [signupVisible, setSignupVisible] = useState(false);
    const handleSignupVisible = (vsb) => {
        if (vsb == true) {
            setSignupVisible(true);
            setVisible(false);
        } else {
            setSignupVisible(false);
        }
    }
    const download = (e) => {
        e.preventDefault();
        axios({
            url: 'http://localhost:5000/api/downloadApp',
            method: "POST",
            responseType: "blob"
        }).then((res) => {
            FileDownload(res.data, "app.zip")
        })
    }

    return (
        <div className='homeWrapper'>
            <div className='home'>
                <div className='wrapper'>
                    <MyButton onClick={setVisible}> Sign In</MyButton>
                    <MyButton onClick={e => handleSignupVisible(true)}> Sign Up</MyButton>
                </div>

                <div className='dw-wrapper'>
                    <div className='img-preview'>
                        <img src={loginimg} height="400" width="400"></img>
                        <img src={apprevimg} height="400" width="400"></img>
                    </div>
                    <div className='text-description'>
                        This is a shared task list app.
                        <br></br>
                        You can share tasks or notes with the people you are interested in.
                        <br></br>
                        To use an application you need to sign up, activate licence and download.
                        <br></br>

                    </div>
                    <DownloadButton onClick={(e) => download(e)} > Download</DownloadButton>
                </div>

                <MyModal visible={visible} setVisible={setVisible}><PostForm setVisible={setVisible} /></MyModal>
                <MyModal visible={signupVisible} setVisible={handleSignupVisible}><SignUpForm setVisible={handleSignupVisible} setSignInVisible={setVisible} /></MyModal>
            </div>
        </div>
    );
}

export { Home };