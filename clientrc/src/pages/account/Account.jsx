import Cookies from 'js-cookie';
import React, { useEffect, useMemo, useState } from 'react';
import axios from "axios";

import ApiService from '../api/ApiService';
import MyButton from '../../ui/button/MyButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Account = () => {

    const [info, setInfo] = useState({
        id: '',
        email: '',
        username: '',
        hasLicence: ''
    })

    const [licenceCls, setLicenceCls] = useState('');

    const notify = () => toast("Activation Error!");


    async function activateLicence() {
        try {
            const response = await axios.post('http://localhost:5000/api/addLicence', {
                token: Cookies.get('token')
            })

            if (response.status == 200) {
                setInfo({ id: info.id, email: info.email, username: info.username, hasLicence: 'active' });
                toast.success("Activation Successful!")
                setLicenceCls('actClass')
            } else {
                toast.error("Activation Error!")
            }
        } catch (err) {
            toast.error("Activation Error!")
        }

    }



    async function fetchInfo() {
        const data = await ApiService.getInfo();
        const hasLicence = data.licence == true ? 'active' : 'inactive'
        if (data.licence == true) {
            setLicenceCls('actClass')
        } else {
            setLicenceCls('inactClass')
        }
        data.hasLicence = hasLicence;
        if (data) {
            setInfo(data);
        }
    }



    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div className=''>
            <div className='nameWrapper'>
                <div className='nameCls'> Anton Stelmakh</div>
                <div className='actButton' ><MyButton onClick={activateLicence}> Active Licence </MyButton></div>
                <ToastContainer />


            </div>

            <div className='dw-wrapper'>
                <div className='cardHeader'> Your Account</div>
                <div className='infocard'>
                    <div className='cardText'>Username: {info.username}</div>
                    <div className='cardText'> Email: {info.username}</div>
                    <div className='cardText'> Licence: <span className={licenceCls}>{info.hasLicence}</span></div>
                    <div className='cardText'> The name and licensed to information in your Account can only be changed via Support because of legal and tax purposes.</div>

                </div>

            </div>

        </div>
    );
}

export { Account };