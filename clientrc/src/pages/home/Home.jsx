
import axios from 'axios';
import React, { useState } from 'react';

const Home = () => {
    const [start, setStart] = useState('');

    axios.get('http://localhost:5000/api/login')
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