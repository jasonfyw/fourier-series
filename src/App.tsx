import React, { useState } from 'react';
import Canvas from './components/Canvas';
import './App.css';
import { Box } from '@chakra-ui/react';
import Menu from './components/Menu';

function App() {
    const [mode, setMode] = useState('input')
    const [points, setPoints] = useState<Array<[number, number]>>([])

    return (
        <Box className="App" background={'#000000'} h={'100vh'} >
            <Canvas mode={mode} setMode={setMode} lineColor={'#eeeeee'} points={points} setPoints={setPoints} />
            <Menu mode={mode} setMode={setMode} />
        </Box>
    );
}

export default App;
