
import axios from 'axios';
import React, { useState } from 'react';
import MyButton from '../../ui/button/MyButton';
import DownloadButton from '../../ui/button/DownloadButton';
import MyModal from '../../ui/MyModal/MyModal';
import PostForm from './PostForm';


const Home = () => {

    const [visible, setVisible] = useState(false);


    return (
        <div className='home'>
            <div className='wrapper'>
                <MyButton onClick={setVisible}> Sign In</MyButton>
                <MyButton> Sign Up</MyButton>
            </div>
            <div className='dw-wrapper'>
                <DownloadButton> Download</DownloadButton>
            </div>

            <MyModal visible={visible} setVisible={setVisible}><PostForm setVisible={setVisible} /></MyModal>

        </div>
    );
}

export { Home };