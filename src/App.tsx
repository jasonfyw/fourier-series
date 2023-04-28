import React, { useState } from 'react';
import Canvas from './components/Canvas';
import './App.css';
import {
    Box,
    useColorModeValue
} from '@chakra-ui/react';
import Menu from './components/Menu';
import TutorialModal from './components/TutorialModal';

function App() {
    const [n, setN] = useState<number>(25)
    const [t, setT] = useState<number>(0)
    const [mode, setMode] = useState<string>('input')
    const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false)
    const [drawCircles, setDrawCircles] = useState<boolean>(true)
    const [showUserInput, setShowUserInput] = useState<boolean>(true)
    const [image, setImage] = useState<string>('')

    const colorMode = useColorModeValue("dark", "light")

    const reset = () => {
        setImage('')
        setMode('reset')
    }

    return (
        <Box className="App" background='bg' h={'100vh'} >
            <Canvas
                n={n}
                t={t}
                setT={setT} 
                mode={mode}
                setMode={setMode}
                lineColor={colorMode === 'light' ? '#eeeeee': '#111111'}
                drawCircles={drawCircles}
                drawerIsOpen={drawerIsOpen}
                showUserInput={showUserInput}
                image={image}
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
                setImage={setImage}
            />

            <TutorialModal setDrawerIsOpen={setDrawerIsOpen} />

        </Box>
    );
}

export default App;
