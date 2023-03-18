import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import { Routes, Link, Route } from "react-router-dom";
import { Home } from './pages/home/Home';
import { Account } from './pages/account/Account';


function App() {


  return (

    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>

  );
}


export default App;
