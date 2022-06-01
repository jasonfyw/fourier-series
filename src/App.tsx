import React, { useState } from 'react';
import Canvas from './components/Canvas';
import './App.css';
import { Box } from '@chakra-ui/react';
import Menu from './components/Menu';

function App() {
    const [mode, setMode] = useState<string>('input')
    const [points, setPoints] = useState<Array<[number, number]>>([])
    const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false)

    return (
        <Box className="App" background={'#000000'} h={'100vh'} >
            <Canvas 
                mode={mode}
                setMode={setMode}
                lineColor={'#eeeeee'}
                drawCircles={true}
                points={points}
                setPoints={setPoints} 
                drawerIsOpen={drawerIsOpen}
            />
            <Menu mode={mode} setMode={setMode} setDrawerIsOpen={setDrawerIsOpen} />
        </Box>
    );
}

export default App;
