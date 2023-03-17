
import axios from 'axios';
import React, { useState } from 'react';

const Home = () => {
    const [start, setStart] = useState('');

    axios.get('http://78.140.252.62/api/login')
        .then(function (response) {
            setStart(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });


    return (
        <div>
            Home page
            <br />
            {start}
        </div>
    );
}

export { Home };