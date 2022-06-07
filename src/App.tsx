import React, { useState } from 'react';
import Canvas from './components/Canvas';
import './App.css';
import {
    Box,
    useColorModeValue
} from '@chakra-ui/react';
import Menu from './components/Menu';

function App() {
    const [n, setN] = useState<number>(25)
    const [mode, setMode] = useState<string>('input')
    const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false)
    const [drawCircles, setDrawCircles] = useState<boolean>(true)
    const [showUserInput, setShowUserInput] = useState<boolean>(true)

    const colorMode = useColorModeValue("dark", "light")

    const reset = () => {
        setMode('reset')
    }

    return (
        <Box className="App" background='bg' h={'100vh'} >
            <Canvas
                n={n} 
                mode={mode}
                setMode={setMode}
                lineColor={colorMode === 'light' ? '#eeeeee': '#111111'}
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
