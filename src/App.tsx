import React, { useState } from 'react';
import Canvas from './components/Canvas';
import './App.css';
import { Box } from '@chakra-ui/react';
import Menu from './components/Menu';

function App() {
    const [mode, setMode] = useState('input')
    const [points, setPoints] = useState<Array<[number, number]>>([])

    const removeLastPoint = () => {
        // removes the last tuple in <points> as it is registered as a point when pressing the Animate button
        setPoints(points.slice(0, -1))
    }

    return (
        <Box className="App" background={'#000000'} h={'100vh'} >
            <Canvas mode={mode} lineColor={'#eeeeee'} points={points} setPoints={setPoints} />
            <Menu setMode={setMode} removeLastPoint={removeLastPoint} />
        </Box>
    );
}

export default App;
