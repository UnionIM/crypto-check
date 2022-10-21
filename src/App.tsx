import './commonStyles/Null.scss';
import React from 'react';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar/Navbar';

function App() {
    return (
        <div className="App">
            <Navbar />
            <AppRouter />
        </div>
    );
}

export default App;
