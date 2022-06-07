import React, { useState } from 'react';
import Canvas from './components/Canvas';
import './App.css';
import { Box } from '@chakra-ui/react';
import Menu from './components/Menu';

function App() {
    const [n, setN] = useState<number>(25)
    const [mode, setMode] = useState<string>('input')
    const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false)
    const [drawCircles, setDrawCircles] = useState<boolean>(true)
    const [showUserInput, setShowUserInput] = useState<boolean>(true)

    const reset = () => {
        setMode('reset')
    }

    return (
        <Box className="App" background={'#000000'} h={'100vh'} >
            <Canvas
                n={n} 
                mode={mode}
                setMode={setMode}
                lineColor={'#eeeeee'}
                drawCircles={drawCircles}
                drawerIsOpen={drawerIsOpen}
                showUserInput={showUserInput}
            />
            <Menu 
                mode={mode}
                setMode={setMode}
                setDrawerIsOpen={setDrawerIsOpen}
                n={n}
                setN={setN}
                reset={reset}
                drawCircles={drawCircles}
                setDrawCircles={setDrawCircles}
                showUserInput={showUserInput}
                setShowUserInput={setShowUserInput}
            />
        </Box>
    );
}

export default App;
