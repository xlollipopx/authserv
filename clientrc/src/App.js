import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import { Routes, Link, Route } from "react-router-dom";
import { Home } from './pages/home/Home';
import { Account } from './pages/account/Account';


function App() {

  const [start, setStart] = useState('');

  axios.get('http://localhost:5000/api/login')
    .then(function (response) {
      setStart(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  return (

    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>

  );
}


export default App;
