import React from 'react';
import './App.css'
import Menu from "./components/Menu/Menu";

class App extends React.Component {
    render() {
        return (
            <div className='allApp'>
                <Menu/>
            </div>
        );
    }
}

export default App;
