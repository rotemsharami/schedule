import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
function App() {
  return (
     <div>
        <Header></Header>
        <Content></Content>
        
     </div>
   
  );
}

export default App;
