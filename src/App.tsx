import React, { useState } from 'react';
import Canvas from './components/Canvas';
import './App.css';
import { Box } from '@chakra-ui/react';
import Menu from './components/Menu';

function App() {
    const [mode, setMode] = useState<string>('input')
    const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false)

    const reset = () => {
        setMode('reset')
    }

    return (
        <Box className="App" background={'#000000'} h={'100vh'} >
            <Canvas 
                mode={mode}
                setMode={setMode}
                lineColor={'#eeeeee'}
                drawCircles={true}
                drawerIsOpen={drawerIsOpen}
            />
            <Menu 
                mode={mode}
                setMode={setMode}
                setDrawerIsOpen={setDrawerIsOpen} 
                reset={reset}
            />
        </Box>
    );
}

export default App;
