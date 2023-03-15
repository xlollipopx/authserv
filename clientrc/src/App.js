import './App.css';
import axios from 'axios';
import React, { useState } from 'react';


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
    <div className="App">
      {start}
    </div>
  );
}

export default App;
